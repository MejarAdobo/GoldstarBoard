import { drizzle } from "drizzle-orm/node-postgres";

const dbURL = Bun.env["DATABASE_URL"]!;

const db = drizzle(dbURL, { casing: "snake_case" });

export { db };
