import { db } from "@goldstarboard/db/client";
import { dailyData } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

import type { starStatusEnum } from "@goldstarboard/shared-types/types";

// Create a daily data
export const createDailyData = async (stationId: string, starStatus: starStatusEnum) =>
  db.insert(dailyData).values({ stationId, starStatus }).returning();

// Update a daily data
export const updateDailyData = async (stationId: string, starStatus: starStatusEnum) =>
  db.update(dailyData).set({ starStatus }).where(eq(dailyData.stationId, stationId)).returning();

// Delete a daily data
export const deleteDailyData = async (stationId: string) =>
  db.delete(dailyData).where(eq(dailyData.stationId, stationId)).returning();

// Delete all daily data
export const deleteAllDailyData = async () => db.delete(dailyData).returning();
