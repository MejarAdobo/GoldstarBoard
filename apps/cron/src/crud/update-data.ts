import { db } from "@goldstarboard/db";
import { hourlyData, stats } from "@goldstarboard/db/src/schema";
import type { WeatherData } from "@goldstarboard/types";
import { eq } from "drizzle-orm";

export const updateStats = async (
  id: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
  lastDaySinceStar: string,
) =>
  db.update(stats).set({ star, hotStreak, coldStreak, lastDaySinceStar }).where(eq(stats.id, id)).returning();

export const updateHourlyData = async (id: number, metricData: WeatherData, imperialData: WeatherData) =>
  db.update(hourlyData).set({ metricData, imperialData }).where(eq(hourlyData.id, id)).returning();
