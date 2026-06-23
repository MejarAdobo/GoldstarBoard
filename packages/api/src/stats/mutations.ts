import { db } from "@goldstarboard/db";
import { stats } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

// Create a stats, this one require a station's primary key as id
export const createStats = async (
  id: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
  lastDaySinceStar: string,
) => db.insert(stats).values({ id, star, hotStreak, coldStreak, lastDaySinceStar }).returning();

// Update a stats
export const updateStats = async (
  id: number,
  star: number,
  hotStreak: number,
  coldStreak: number,
  lastDaySinceStar: string,
) =>
  db.update(stats).set({ star, hotStreak, coldStreak, lastDaySinceStar }).where(eq(stats.id, id)).returning();

// Delete a stats
export const deleteStats = async (id: number) => db.delete(stats).where(eq(stats.id, id)).returning();

// Delete all stats
export const deleteAllStats = async () => db.delete(stats).returning();
