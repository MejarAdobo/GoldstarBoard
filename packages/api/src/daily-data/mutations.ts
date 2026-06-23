import { db } from "@goldstarboard/db";
import { dailyData } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

import type { starStatusEnum } from "@goldstarboard/types";

// Create a daily data
export const createDailyData = async (id: number, starStatus: starStatusEnum) =>
  db.insert(dailyData).values({ id, starStatus }).returning();

// Update a daily data
export const updateDailyData = async (id: number, starStatus: starStatusEnum) =>
  db.update(dailyData).set({ starStatus }).where(eq(dailyData.id, id)).returning();

// Delete a daily data
export const deleteDailyData = async (id: number) =>
  db.delete(dailyData).where(eq(dailyData.id, id)).returning();

// Delete all daily data
export const deleteAllDailyData = async () => db.delete(dailyData).returning();
