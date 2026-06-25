import { db } from "@goldstarboard/db/client";
import { historicalStats } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Get one historicalStats
export const getHistoricalStats = async (id: number) =>
  db.select().from(historicalStats).where(eq(historicalStats.id, id));

// Get historicalStats by stationId
export const getHistoricalStatsByStation = async (stationId: string) =>
  db.select().from(historicalStats).where(eq(historicalStats.stationId, stationId));

// Get all historicalStats
export const getAllHistoricalStats = async () => db.select().from(historicalStats);
