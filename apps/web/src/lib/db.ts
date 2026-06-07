import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@talentflow/database/src/schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
