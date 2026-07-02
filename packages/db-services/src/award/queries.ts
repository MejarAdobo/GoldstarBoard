import { db } from "@goldstarboard/db/client";
import { awards } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Get one award
export const getAward = async (id: number) => db.select().from(awards).where(eq(awards.id, id));

// Get all awards of a specific station
export const getAllAwardsByStation = async (stationId: string) =>
  db.select().from(awards).where(eq(awards.stationId, stationId));

// Get all awards
export const getAllAwards = async () => db.select().from(awards);
