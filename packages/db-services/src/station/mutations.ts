import { db } from "@goldstarboard/db/client";
import { stations } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Create a station
export const createStation = async (name: string, wuId: string) =>
  db.insert(stations).values({ name, wuId }).returning();

// Update a station
export const updateStation = async (id: number, name: string, wuId: string) =>
  db.update(stations).set({ name, wuId }).where(eq(stations.id, id)).returning();

// Delete a station
export const deleteStation = async (wuId: string) =>
  db.delete(stations).where(eq(stations.wuId, wuId)).returning();

// Delete all stations
export const deleteAllStations = async () => db.delete(stations).returning();
