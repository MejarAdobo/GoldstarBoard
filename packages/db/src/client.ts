import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";

const dbURL = Bun.env["DATABASE_URL"]!;

const db = drizzle(dbURL, { relations });

export { db };
