"use server";
import { Todo, ViewTodo, todos } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "./drizzle";

export const createTodo = async (todo: ViewTodo) => {
  return await db.insert(todos).values(todo);
};
export const readTodos = async () => {
  const todoList: Todo[] = await db.query.todos.findMany({
    orderBy: todos.updated_at,
  });
  return todoList.toReversed();
};
export const readTodoDetails = async (id: string) => {
  return await db.query.todos.findFirst({ where: eq(todos.id, id) });
};
export const updateTodo = async (todo: ViewTodo) => {
  return await db.update(todos).set(todo).where(eq(todos.id, todo.id));
};
export const deleteTodo = async (id: string) => {
  return await db.delete(todos).where(eq(todos.id, id));
};
