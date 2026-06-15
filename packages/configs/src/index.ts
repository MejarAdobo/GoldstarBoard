import dotenv from "dotenv";
dotenv.config();

const { dbConfig } = await import("./db.config");
const { honoConfig } = await import("./hono.config");

export { dbConfig, honoConfig };
