import { defineConfig } from "drizzle-kit";

const dbURL = process.env["DATABASE_URL"]!;

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  tablesFilter: ["stations", "stats", "hourlyData", "historicalStats", "dailyData", "awards"],
  dialect: "postgresql",
  dbCredentials: {
    url: dbURL,
  },
  schemaFilter: ["public"],
});
