import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/database/drizzle/schema.ts",
  out: "./app/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_CONNECTION_URL!,
  },
  verbose: true,
  strict: true,
});
