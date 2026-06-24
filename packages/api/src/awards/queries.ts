import { db } from "@goldstarboard/db/client";
import { awards } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

// Get one award
export const getAward = async (id: number) => db.select().from(awards).where(eq(awards.id, id));

// Get all awards
export const getAllAwards = async () => db.select().from(awards);
