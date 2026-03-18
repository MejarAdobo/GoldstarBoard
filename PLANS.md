# Plans for the app

## Fonts

- Bricolage Grotesque (Heading)
- Fraunces

## Pages

---

// Optional

- **Profile Page**

  **Functionality**
  - Can only be accessed by clicking on a station
  - Display the general weather information in the dashboard for each weather station
    - Weather which can be display through Icons
    - Temperature
    - Precipitation
    - Rainfall
    - Dew Point
    - Humidity
    - Link for the weather station in weatherunderground in a website
  - Display a calendar style like GitHub contributions for:
    - Display how long the streak
    - Display how many days have gold star
    - The day a weather station has a gold star
    - The day a weather station gain a gold star
    - The dat a weather station loss a gold star

---

- **Leaderboard Page**

  **Functionality:**
  - Show the ranking between Weather Stations
  - Display this information about the weather station
    - The name of the weather station or their id if no name assign
    - Profile Images // maybe
    - Gold Star Streak
    - Days with Gold Star
    - If weather station gain or lose a gold star
      - Dispay that this weather station has gain or loss a gold star
    - If weather station has no gold star
      - Display the last day that the weather station has a gold star
    - Display Active Station
    - Display Avg streak
      **Maybe Added**
    - Temperature
    - Chance of Rain
    - Weather (Icon)
    - Wind Direction and Wind Preassure

---

- **Station Page**

  **Functionality:**
  - Do CRUD Operation with Weather Station
    - Add a new Weather Station by putting their weatherunderground id (IGABRI2)
    - Remove weather station by selecting from existing weather station
  - Manage the weather station
    - Add a name/nickname (ex. Bob's Weather Station)
    - Add image as profile
  - When a station is being added or remove
    - The id(IGABRI0) is sent when a station is being added or remove into a table in a database

---

- **Record Page**

  **Functionality:**
  - Have subpage for weekly, monthly and annual
  - The subpage each display:
    - The top 3 weather stations that has the longest streak
    - The top3 weather stations that held the most gold star
    - Personal Data for each weather station
      - longest streak
      - most gold star

---

- **Setting Page**

  **Functionality:**
  - Change the theme of the app
  - Change the language of the app
    - Planned Language:
      - English
  - Allow to change unit of measurement (Imperial, Metric, and Kelvin)
  - Permissions
    - Notification

## Notification

**This required permission from user's phone**

### What to display in each type of notification

- **Push Notification**
  - Display when a weather station has loss their gold star
  - Display when a weather station has gain a gold star
  - Message:
    - <Weather Station> has lost their gold star streak!
    - <Weather Station> has gain their gold star today!

- **Widget Notification**
  - Daily Report
    - For each weather station, display:
      - The name of the weather station or their id if no name assign
      - Display if the weather station either gain or loss a gold star
      - The length of gold star streak
        - If no gold star
          - Display the last date the weather station held a gold star
