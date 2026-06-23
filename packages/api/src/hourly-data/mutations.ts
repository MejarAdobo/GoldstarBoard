import { db } from "@goldstarboard/db";
import { hourlyData } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

import type { WeatherData } from "@goldstarboard/types";

// Create a hourly data
export const createHourlyData = async (id: number, metricData: WeatherData, imperialData: WeatherData) =>
  db.insert(hourlyData).values({ id, metricData, imperialData }).returning();

// Update a hourly data
export const updateHourlyData = async (id: number, metricData: WeatherData, imperialData: WeatherData) =>
  db.update(hourlyData).set({ metricData, imperialData }).where(eq(hourlyData.id, id)).returning();

// Delete a hourly data
export const deleteHourlyData = async (id: number) =>
  db.delete(hourlyData).where(eq(hourlyData.id, id)).returning();

// Delete all hourly data
export const deleteAllHourlyData = async () => db.delete(hourlyData).returning();
