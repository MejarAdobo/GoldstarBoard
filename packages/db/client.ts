import { drizzle } from 'drizzle-orm/node-postgres';

const dbURL = Bun.env['DATABASE_URL']!

const db = drizzle(dbURL)

export { db };
