// Import necessary dependencies from React and external libraries
import { createContext, useContext } from "react";

// Import methods from Prisma and Drizzle
import * as PrismaDb from "@/prisma/operations";
import * as DrizzleDb from "@/drizzle/operations";

// Define a type that can hold props for both Prisma and Drizzle operations
export type DbContextProps = DrizzleDb.DrizzleDbProps | PrismaDbProps;

// Create a context for database operations
const DbContext = createContext<DbContextProps | null>(null);

/**
 * useDatabase: A custom hook to access the database context.
 * Returns an object containing database methods.
 */
export const useDatabase = () => useContext(DbContext);

/**
 * DbContextProvider: A component to provide database context to its children.
 *
 * Props:
 * - children: React node representing the children components.
 */
export const DbContextProvider = ({ children }: ProviderProps) => {
  // Determine whether to use Prisma or Drizzle based on an environment variable
  const isORMTypeDrizzle =
    process.env.NEXT_PUBLIC_IS_ORM_TYPE_DRIZZLE === "true";

  // Choose the appropriate database methods based on the environment variable
  const shared = isORMTypeDrizzle ? DrizzleDb : PrismaDb;

  // Provide the context value to its children
  return <DbContext.Provider value={shared}>{children}</DbContext.Provider>;
};
