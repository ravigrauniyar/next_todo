import { defineConfig } from "drizzle-kit";

/**
 * Database Configuration
 *
 * This configuration file sets up database migration using the Drizzle framework.
 * It defines settings such as the database schema, output directory for migrations,
 * database driver, database credentials, verbosity level, and strict mode.
 *
 * Configuration Options:
 * - schema: Specifies the path to the database schema file.
 * - out: Specifies the output directory for generated migrations.
 * - driver: Specifies the database driver, in this case, PostgreSQL ("pg").
 * - dbCredentials: Specifies the database connection credentials, including the connection string.
 * - verbose: Specifies whether to output verbose logging during migration (true/false).
 * - strict: Specifies whether to enforce strict mode during migration (true/false).
 */
export default defineConfig({
  schema: "./app/database/drizzle/schema.ts",
  out: "./app/database/drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DB_URL!,
  },
  verbose: true,
  strict: true,
});
