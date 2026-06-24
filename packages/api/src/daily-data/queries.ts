import { db } from "@goldstarboard/db/client";
import { dailyData } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Get one dailyData
export const getDailyData = async (id: number) => db.select().from(dailyData).where(eq(dailyData.id, id));

// Get all dailyData
export const getAllDailyData = async () => db.select().from(dailyData);
