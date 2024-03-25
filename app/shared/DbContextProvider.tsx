// Import React if you're using React hooks
import { createContext, useContext } from "react";
// Import methods from Prisma
import * as prismaMethods from "@/prisma/operations";
// Import methods from Drizzle
import * as drizzleMethods from "@/drizzle/operations";

type DbContextProps = {
  createTodo: any;
  readTodos: any;
  readTodoDetails: any;
  updateTodo: any;
  deleteTodo: any;
};

const DbContext = createContext<DbContextProps | null>(null);
export const useDatabase = () => useContext(DbContext);

export const DbContextProvider = ({ children }: ProviderProps) => {
  // Check the environment variable to determine the ORM type
  const databaseMethods: DbContextProps =
    process.env.IS_ORM_TYPE_DRIZZLE === "true"
      ? { ...drizzleMethods }
      : { ...prismaMethods };

  return (
    <DbContext.Provider value={databaseMethods}>{children}</DbContext.Provider>
  );
};
