import { db } from "@goldstarboard/db";
import { users } from "@goldstarboard/db/src/schema";
import { eq } from "drizzle-orm";

// Get one user
export const getUser = async (id: number) => db.select().from(users).where(eq(users.id, id));

// Get all users
export const getAllUsers = async () => db.select().from(users);
