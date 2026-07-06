import { defineConfig } from "drizzle-kit";

const dbURL = process.env["DATABASE_URL"]!;

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbURL,
  },
  schemaFilter: ["public"],
});
