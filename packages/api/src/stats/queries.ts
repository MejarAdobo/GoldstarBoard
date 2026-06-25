import { db } from "@goldstarboard/db/client";
import { stats } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Get one stats
export const getStats = async (stationId: string) =>
  db.select().from(stats).where(eq(stats.stationId, stationId));

// Get all stats
export const getAllStats = async () => db.select().from(stats);
