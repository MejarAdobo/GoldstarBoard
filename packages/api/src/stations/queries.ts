import { db } from "@goldstarboard/db";
import { stations } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

// Get one station
export const getStation = async (id: number) => db.select().from(stations).where(eq(stations.id, id));

// Get all stations
export const getAllStations = async () => db.select().from(stations);
