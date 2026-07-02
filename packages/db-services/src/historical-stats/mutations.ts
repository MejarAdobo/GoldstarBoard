import { db } from "@goldstarboard/db/client";
import { historicalStats } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Create a historicalStats
export const createHistoricalStats = async (
  stationId: string,
  year: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
) => db.insert(historicalStats).values({ stationId, year, star, hotStreak, coldStreak }).returning();

// Update a historicalStats
export const updateHistoricalStats = async (
  stationId: string,
  year: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
) =>
  db
    .update(historicalStats)
    .set({ stationId, year, star, hotStreak, coldStreak })
    .where(eq(historicalStats.stationId, stationId))
    .returning();

// Delete a historicalStats
export const deleteHistoricalStats = async (stationId: string) =>
  db.delete(historicalStats).where(eq(historicalStats.stationId, stationId)).returning();

// Delete all historicalStats of a specific station
export const deleteAllHistoricalStatsByStation = async (stationId: string) =>
  db.delete(historicalStats).where(eq(historicalStats.stationId, stationId)).returning();

// Delete all historicalStats
export const deleteAllHistoricalStats = async () => db.delete(historicalStats).returning();
