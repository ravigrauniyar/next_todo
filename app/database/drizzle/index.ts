import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const URL = process.env.DB_CONNECTION_URL;

const sql = postgres(URL!, { max: 1 });
export const db = drizzle(sql, { schema });
