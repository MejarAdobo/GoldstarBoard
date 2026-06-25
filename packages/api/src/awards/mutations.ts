import { db } from "@goldstarboard/db/client";
import { awards } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

import type { awardTypeEnum } from "@goldstarboard/shared-types/types";

// Create an award
export const createAward = async (
  stationId: string,
  year: number,
  title: string,
  type: awardTypeEnum,
  rank: number,
  score: number,
) => db.insert(awards).values({ stationId, year, title, type, rank, score }).returning();

// Update an award
export const updateAward = async (
  stationId: string,
  year: number,
  title: string,
  type: awardTypeEnum,
  rank: number,
  score: number,
) =>
  db
    .update(awards)
    .set({ year, title, type, rank, score })
    .where(eq(awards.stationId, stationId))
    .returning();

// Delete an award
export const deleteAward = async (stationId: string) =>
  db.delete(awards).where(eq(awards.stationId, stationId)).returning();

// Delete all awards of a specific station
export const deleteAllAwardsByStation = async (stationId: string) =>
  db.delete(awards).where(eq(awards.stationId, stationId)).returning();

// Delete all awards
export const deleteAllAwards = async () => db.delete(awards).returning();
