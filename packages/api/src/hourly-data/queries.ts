import { db } from "@goldstarboard/db/client";
import { hourlyData } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Get one hourly data
export const getHourlyData = async (id: number) => db.select().from(hourlyData).where(eq(hourlyData.id, id));

// Get all hourly data
export const getAllHourlyData = async () => db.select().from(hourlyData);
