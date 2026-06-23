import { db } from "@goldstarboard/db";
import { awards } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

// Get one award
export const getAward = async (id: number) => db.select().from(awards).where(eq(awards.id, id));

// Get all awards
export const getAllAwards = async () => db.select().from(awards);
