import { db } from "@goldstarboard/db/client";
import { stats } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Create a stats, this one require a station's primary key as id
export const createStats = async (
  stationId: string,
  star: number,
  hotStreak: number,
  coldStreak: number,
  lastDaySinceStar: string | undefined,
) => db.insert(stats).values({ stationId, star, hotStreak, coldStreak, lastDaySinceStar }).returning();

// Update a stats
export const updateStats = async (
  stationId: string,
  star: number,
  hotStreak: number,
  coldStreak: number,
  lastDaySinceStar: string | null,
) =>
  db
    .update(stats)
    .set({ star, hotStreak, coldStreak, lastDaySinceStar })
    .where(eq(stats.stationId, stationId))
    .returning();

// Delete a stats
export const deleteStats = async (stationId: string) =>
  db.delete(stats).where(eq(stats.stationId, stationId)).returning();

// Delete all stats
export const deleteAllStats = async () => db.delete(stats).returning();
