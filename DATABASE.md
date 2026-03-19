## DATABASE SCHEMA

probably have a group so their could be seperate ranking incase a stranger just downloaded my app and then add their station

## TABLES

- station - info for the station
- award - exsisting awards
- gold_star - track the gold star status througout the day
- station_group - a group of station
- group \* do it if their is time

- **station:**
  - id: int # primary key
  - name: string # weather station id for weatherunderground
  - wu_link: string # link to tweatherunderground profile
  - total_gold_star: int # total accumulated gold star

- **group:**
  - id: int # primary key
  - name: string # weather station id for weatherunderground
  - password
  - email
  - group_leader

## Help from Claude

# Weather Station Gold Star Tracker — Database Schema Plan

## Overview

This schema supports a scraper that checks weather station data from Weather Underground every hour, tracking gold star status to power a leaderboard and calendar view.

---

## Tables

### 1. WeatherStation

The central table storing station identity and running aggregates.

| Column                   | Type     | Constraints               | Description                                                   |
| ------------------------ | -------- | ------------------------- | ------------------------------------------------------------- |
| id                       | Integer  | Primary Key               | Auto-incrementing ID                                          |
| name                     | String   | Not Null                  | Display name of the station                                   |
| wunderground_id          | String   | Unique, Indexed, Not Null | Weather Underground ID (e.g. IGABRI120)                       |
| wunderground_link        | String   | Not Null                  | Full URL to the station page                                  |
| total_gold_star_days     | Integer  | Default 0                 | Running count of all gold star days                           |
| longest_gold_star_streak | Integer  | Default 0                 | All-time longest consecutive gold star streak                 |
| current_gold_star_streak | Integer  | Default 0                 | Active streak length, compared against longest on each update |
| created_at               | DateTime | Not Null                  | Record creation timestamp                                     |
| updated_at               | DateTime | Not Null                  | Last update timestamp                                         |

### 2. HourlyCheck

Raw scraped data — one row per scrape per station.

| Column        | Type     | Constraints                                        | Description                                       |
| ------------- | -------- | -------------------------------------------------- | ------------------------------------------------- |
| id            | Integer  | Primary Key                                        | Auto-incrementing ID                              |
| station_id    | Integer  | Foreign Key → WeatherStation.id, ON DELETE CASCADE | The station this check belongs to                 |
| has_gold_star | Boolean  | Not Null                                           | Whether the station had a gold star at check time |
| temperature   | Float    | Nullable                                           | Temperature reading at check time                 |
| checked_at    | DateTime | Not Null                                           | Scrape time, rounded to the hour                  |
| created_at    | DateTime | Not Null                                           | Record creation timestamp                         |

**Unique Constraint:** `(station_id, checked_at)` — prevents duplicate scrapes.

**Index:** `(station_id, checked_at)` — fast lookups by station and time range.

### 3. DailySummary

Computed rollup table powering the calendar view and leaderboard.

| Column                | Type     | Constraints                                        | Description                                                            |
| --------------------- | -------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| id                    | Integer  | Primary Key                                        | Auto-incrementing ID                                                   |
| station_id            | Integer  | Foreign Key → WeatherStation.id, ON DELETE CASCADE | The station this summary belongs to                                    |
| date                  | Date     | Not Null                                           | The calendar date (not datetime)                                       |
| had_gold_star         | Boolean  | Not Null                                           | Whether the station earned a gold star for this day                    |
| avg_temp              | Float    | Nullable                                           | Average temperature across all hourly checks for the day               |
| gold_star_hours_count | Integer  | Default 0                                          | How many hourly checks showed a gold star (helps decide daily verdict) |
| created_at            | DateTime | Not Null                                           | Record creation timestamp                                              |

**Unique Constraint:** `(station_id, date)` — one summary per station per day.

**Index:** `(station_id, date)` — fast calendar and leaderboard queries.

### 4. Award (Stretch Goal)

Tracks monthly and annual awards for leaderboard recognition.

| Column       | Type        | Constraints                                        | Description                                                                     |
| ------------ | ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| id           | Integer     | Primary Key                                        | Auto-incrementing ID                                                            |
| station_id   | Integer     | Foreign Key → WeatherStation.id, ON DELETE CASCADE | The winning station                                                             |
| award_type   | String/Enum | Not Null                                           | Type of award: `monthly_streak`, `monthly_days`, `annual_streak`, `annual_days` |
| period_start | Date        | Not Null                                           | Start of the award period                                                       |
| period_end   | Date        | Not Null                                           | End of the award period                                                         |
| value        | Integer     | Not Null                                           | The streak length or day count that won the award                               |
| awarded_at   | DateTime    | Not Null                                           | When the award was granted                                                      |

---

## Relationships

```
WeatherStation (1) ──→ (Many) HourlyCheck       via station_id FK
WeatherStation (1) ──→ (Many) DailySummary       via station_id FK
WeatherStation (1) ──→ (Many) Award              via station_id FK
```

- HourlyCheck and DailySummary do **not** have a foreign key between them.
- They are joined when needed via `station_id` and `DATE(checked_at) = date`.

---

## Gold Star Status Derivation

The calendar status (gained, kept, lost, none) is **not stored** — it is derived at query time using a `LAG()` window function over DailySummary:

| Yesterday | Today    | Status     |
| --------- | -------- | ---------- |
| No star   | Has star | **gained** |
| Has star  | Has star | **kept**   |
| Has star  | No star  | **lost**   |
| No star   | No star  | **none**   |

```sql
SELECT
    date,
    had_gold_star,
    CASE
        WHEN had_gold_star AND NOT LAG(had_gold_star, 1, FALSE) OVER (ORDER BY date) THEN 'gained'
        WHEN had_gold_star AND LAG(had_gold_star, 1, FALSE) OVER (ORDER BY date) THEN 'kept'
        WHEN NOT had_gold_star AND LAG(had_gold_star, 1, FALSE) OVER (ORDER BY date) THEN 'lost'
        ELSE 'none'
    END AS gold_star_status
FROM daily_summary
WHERE station_id = :station_id
    AND date BETWEEN :start_date AND :end_date
ORDER BY date;
```

---

## Daily Rollup Logic

A scheduled job (after the last scrape of the day or early next morning) should:

1. Query all HourlyCheck rows for each station for that date.
2. Determine `had_gold_star` (e.g. if any/majority of checks had a star).
3. Compute `avg_temp` and `gold_star_hours_count`.
4. Insert or update the DailySummary row.
5. Update the station's counters:
   - If gold star day: increment `total_gold_star_days`, increment `current_gold_star_streak`, update `longest_gold_star_streak` if current exceeds it.
   - If not: reset `current_gold_star_streak` to 0.

---

## Scraper Idempotency

- `checked_at` is rounded to the hour.
- The unique constraint on `(station_id, checked_at)` prevents duplicate rows if the scraper runs twice in the same hour.
- Use `INSERT ... ON CONFLICT DO NOTHING` or SQLAlchemy equivalent.

