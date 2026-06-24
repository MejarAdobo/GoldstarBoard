import { db } from "@goldstarboard/db/client";
import { awards } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

import type { awardTypeEnum } from "@goldstarboard/shared-types/types";

// Create an award
export const createAward = async (
  id: number,
  year: number,
  title: string,
  type: awardTypeEnum,
  rank: number,
  score: number,
) => db.insert(awards).values({ stationId: id, year, title, type, rank, score }).returning();

// Update an award
export const updateAward = async (
  id: number,
  year: number,
  title: string,
  type: awardTypeEnum,
  rank: number,
  score: number,
) => db.update(awards).set({ year, title, type, rank, score }).where(eq(awards.id, id)).returning();

// Delete an award
export const deleteAward = async (id: number) => db.delete(awards).where(eq(awards.id, id)).returning();

// Delete all awards
export const deleteAllAwards = async () => db.delete(awards).returning();
