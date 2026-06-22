import { defineConfig } from "drizzle-kit";

const dbURL = process.env["DATABASE_URL"]!;

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: dbURL,
  },
  schemaFilter: ["public"],
});
