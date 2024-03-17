"use server";

import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { Todo, ViewTodo, todos } from "@/drizzle/schema";

/**
 * createTodo: Creates a new todo item.
 *
 * @param todo A ViewTodo object representing the todo item to be created.
 * @returns A Promise that resolves when the todo item is successfully created.
 */
export const createTodo = async (todo: ViewTodo) => {
  return await db.insert(todos).values(todo);
};

/**
 * readTodos: Retrieves a list of all todo items.
 *
 * @returns A Promise that resolves with an array of Todo objects, ordered by their updated_at timestamps in descending order.
 */
export const readTodos = async () => {
  const todoList: Todo[] = await db.query.todos.findMany({
    orderBy: todos.updated_at,
  });
  return todoList.toReversed();
};

/**
 * readTodoDetails: Retrieves details of a specific todo item.
 *
 * @param id A string representing the unique identifier of the todo item.
 * @returns A Promise that resolves with the details of the specified todo item.
 */
export const readTodoDetails = async (id: string) => {
  return await db.query.todos.findFirst({ where: eq(todos.id, id) });
};

/**
 * updateTodo: Updates an existing todo item.
 *
 * @param todo A ViewTodo object representing the updated todo item.
 * @returns A Promise that resolves when the todo item is successfully updated.
 */
export const updateTodo = async (todo: ViewTodo) => {
  return await db.update(todos).set(todo).where(eq(todos.id, todo.id));
};

/**
 * deleteTodo: Deletes a todo item.
 *
 * @param id A string representing the unique identifier of the todo item to be deleted.
 * @returns A Promise that resolves when the todo item is successfully deleted.
 */
export const deleteTodo = async (id: string) => {
  return await db.delete(todos).where(eq(todos.id, id));
};
