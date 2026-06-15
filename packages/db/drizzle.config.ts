import { dbConfig } from "@goldstarboard/configs";
import { defineConfig } from "drizzle-kit";

const databaseUrl = dbConfig.connectionString;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: ".drizzle",
  dbCredentials: {
    url: databaseUrl,
  },
  schemaFilter: ["public"],
});
