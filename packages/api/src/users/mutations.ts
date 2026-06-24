import { db } from "@goldstarboard/db/client";
import { users } from "@goldstarboard/db/schema";
import { eq } from "drizzle-orm";

import type { UserRole } from "@goldstarboard/shared-types/types";

// Create a user
export const createUser = async (name: string, email: string, password: string, role: UserRole) =>
  db.insert(users).values({ name, email, password, role }).returning();

// Update a user
export const updateUser = async (id: number, name: string, email: string, password: string, role: UserRole) =>
  db.update(users).set({ name, email, password, role }).where(eq(users.id, id)).returning();

// Delete a user
export const deleteUser = async (id: number) => db.delete(users).where(eq(users.id, id)).returning();

// Delete all users
export const deleteAllUsers = async () => db.delete(users).returning();
