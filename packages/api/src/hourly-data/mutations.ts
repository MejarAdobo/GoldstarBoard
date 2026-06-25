import { db } from "@goldstarboard/db/client";
import { hourlyData } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

import type { WeatherData } from "@goldstarboard/shared-types/interfaces";

// Create a hourly data
export const createHourlyData = async (
  stationId: string,
  metricData: WeatherData,
  imperialData: WeatherData,
) => db.insert(hourlyData).values({ stationId, metricData, imperialData }).returning();

// Update a hourly data
export const updateHourlyData = async (
  stationId: string,
  metricData: WeatherData,
  imperialData: WeatherData,
) =>
  db
    .update(hourlyData)
    .set({ metricData, imperialData })
    .where(eq(hourlyData.stationId, stationId))
    .returning();

// Delete a hourly data
export const deleteHourlyData = async (stationId: string) =>
  db.delete(hourlyData).where(eq(hourlyData.stationId, stationId)).returning();

// Delete all hourly data
export const deleteAllHourlyData = async () => db.delete(hourlyData).returning();
