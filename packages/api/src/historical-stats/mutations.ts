import { db } from "@goldstarboard/db";
import { historicalStats } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

// Create a historicalStats
export const createHistoricalStats = async (
  stationId: number,
  year: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
) => db.insert(historicalStats).values({ stationId, year, star, hotStreak, coldStreak }).returning();

// Update a historicalStats
export const updateHistoricalStats = async (
  id: number,
  stationId: number,
  year: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
) =>
  db
    .update(historicalStats)
    .set({ stationId, year, star, hotStreak, coldStreak })
    .where(eq(historicalStats.id, id))
    .returning();

// Delete a historicalStats
export const deleteHistoricalStats = async (id: number) =>
  db.delete(historicalStats).where(eq(historicalStats.id, id)).returning();

// Delete all historicalStats
export const deleteAllHistoricalStats = async () => db.delete(historicalStats).returning();
