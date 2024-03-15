import {
  pgTable,
  varchar,
  uuid,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  priority: integer("priority"),
  isCompleted: boolean("isCompleted"),
  created_at: varchar("created_at"),
  updated_at: varchar("updated_at"),
});

export type Todo = typeof todos.$inferSelect;
export type ViewTodo = typeof todos.$inferInsert;
