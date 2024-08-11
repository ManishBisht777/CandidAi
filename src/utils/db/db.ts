import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

console.log(process.env.DRIZZLE_DATABASE_URL);
console.log(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL);

if (!process.env.DRIZZLE_DATABASE_URL) {
  throw new Error("Missing DRIZZLE_DATABASE_URL in environment variables");
}

const sql = neon(process.env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, { schema });
