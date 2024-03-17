import postgres from "postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

/**
 * URL: Represents the connection URL to the database.
 */
const URL = process.env.DB_CONNECTION_URL;

/**
 * sql: Represents the PostgreSQL client initialized with the provided connection URL.
 */
const sql = postgres(URL!, { max: 1 });

/**
 * db: Represents the database client initialized with the PostgreSQL client and schema.
 */
export const db = drizzle(sql, { schema });
