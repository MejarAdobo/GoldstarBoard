import * as p from "drizzle-orm/pg-core";
import { timestamps } from "./utils";

// Users
export const users = p.pgTable("users", {
  id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
  name: p.varchar({ length: 25 }).notNull(),
  email: p.varchar({ length: 255 }).notNull(),
  password: p.varchar({ length: 255 }).notNull(),
  role: p.varchar({ enum: ["user", "admin"] }).notNull(),
  ...timestamps(),
});

// Stations
export const stations = p.pgTable("stations", {
  id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
  name: p.varchar({ length: 25 }).notNull(),
  wuId: p.varchar("wu_id", { length: 12 }).notNull().unique(),
  ...timestamps(),
});

// Stats
export const stats = p.pgTable("stats", {
  id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
  stationId: p
    .varchar("station_id")
    .references(() => stations.wuId, { onDelete: "cascade" })
    .notNull(),
  star: p.integer().default(0).notNull(),
  hotStreak: p.integer("hot_streak").default(0).notNull(),
  coldStreak: p.integer("cold_streak").default(0).notNull(),
  lastDaySinceStar: p.date("last_day_since_star", { mode: "string" }).notNull(),
  ...timestamps(),
});

// Hourly Data
export const hourlyData = p.pgTable("hourly_data", {
  id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
  stationId: p
    .varchar("station_id")
    .references(() => stations.wuId, { onDelete: "cascade" })
    .notNull(),
  metricData: p.jsonb("metric_data").notNull(),
  imperialData: p.jsonb("imperial_data").notNull(),
  ...timestamps(),
});

// Historical Stats
export const historicalStats = p.pgTable(
  "historical_stats",
  {
    id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
    stationId: p
      .varchar("station_id")
      .references(() => stations.wuId, { onDelete: "cascade" })
      .notNull(),
    year: p.integer().notNull(),
    star: p.integer().default(0).notNull(),
    hotStreak: p.integer("hot_streak").default(0).notNull(),
    coldStreak: p.integer("cold_streak").default(0).notNull(),
    ...timestamps(),
  },
  (table) => [p.index("historical_stats_station_id_idx").on(table.stationId)],
);

// Daily Data
export const dailyData = p.pgTable(
  "daily_data",
  {
    id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
    stationId: p
      .varchar("station_id")
      .references(() => stations.wuId, { onDelete: "cascade" })
      .notNull(),
    starStatus: p.varchar("star_status", { enum: ["gain", "loss", "maintain", "none"] }),
    ...timestamps(),
  },
  (table) => [p.index("daily_data_station_id_idx").on(table.stationId)],
);

// Awards
export const awards = p.pgTable(
  "awards",
  {
    id: p.integer().primaryKey().generatedByDefaultAsIdentity(),
    stationId: p
      .varchar("station_id")
      .references(() => stations.wuId, { onDelete: "cascade" })
      .notNull(),
    year: p.integer().notNull(),
    title: p.varchar({ length: 50 }).notNull(),
    type: p.varchar({ enum: ["hot_streak", "cold_streak", "most_stars", "least_stars"] }),
    rank: p.integer().notNull(),
    score: p.integer().notNull(),
    ...timestamps(),
  },
  (table) => [p.index("awards_station_id_idx").on(table.stationId)],
);
