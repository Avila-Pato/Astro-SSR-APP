import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import * as schema from "./schema" 


dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL is not defined");
}

export const db = process.env.DATABASE_URL ? drizzle(process.env.DATABASE_URL, { schema }) : undefined;
