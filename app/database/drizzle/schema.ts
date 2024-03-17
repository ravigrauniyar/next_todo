import { pgTable, varchar, uuid, integer, boolean } from "drizzle-orm/pg-core";

/**
 * todos: Represents a table structure for storing todo items in a PostgreSQL database.
 *
 * Fields:
 * - id: A UUID field representing the unique identifier of the todo item (primary key).
 * - title: A string field representing the title of the todo item, with a maximum length of 256 characters.
 * - description: A string field representing the description of the todo item, with a maximum length of 256 characters.
 * - priority: An integer field representing the priority of the todo item.
 * - isCompleted: A boolean field indicating whether the todo item is completed.
 * - created_at: A string field representing the timestamp when the todo item was created.
 * - updated_at: A string field representing the timestamp when the todo item was last updated.
 */
export const todos = pgTable("todos", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  priority: integer("priority"),
  isCompleted: boolean("isCompleted"),
  created_at: varchar("created_at"),
  updated_at: varchar("updated_at"),
});

/**
 * Todo: Represents the type of a todo item, inferred from the todos table structure.
 */
export type Todo = typeof todos.$inferSelect;

/**
 * ViewTodo: Represents the type of a todo item used for insertion, inferred from the todos table structure.
 */
export type ViewTodo = typeof todos.$inferInsert;
