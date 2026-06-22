import { db } from "@goldstarboard/db";
import { awards, dailyData, historicalStats } from "@goldstarboard/db/src/schema";

type starStatusEnum = "gain" | "loss" | "maintain" | "none";

type awardTypeEnum = "hot_streak" | "cold_streak" | "most_stars" | "least_stars";

export const createHistStats = async (
  id: number,
  year: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
) =>
  db
    .insert(historicalStats)
    .values({
      stationId: id,
      year,
      star,
      hotStreak,
      coldStreak,
    })
    .returning();

export const createDailyData = async (id: number, starStatus: starStatusEnum) =>
  db
    .insert(dailyData)
    .values({
      stationId: id,
      starStatus,
    })
    .returning();

export const createAward = async (id: number, year: number, title: string, type: awardTypeEnum) =>
  db
    .insert(awards)
    .values({
      stationId: id,
      year,
      title,
      type,
    })
    .returning();
