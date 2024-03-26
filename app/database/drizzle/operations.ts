"use server";

import { db } from ".";
import { eq } from "drizzle-orm";
import { DrizzleTodoDTO, ViewDrizzleTodo, todos } from "@/drizzle/schema";

/**
 * DrizzleDbProps: Defines the interface for interacting with the database in the context of managing todo items.
 */
export type DrizzleDbProps = {
  /**
   * createTodo: Creates a new todo item in the database.
   *
   * @param todo A ViewDrizzleTodo object representing the todo item to be created.
   */
  createTodo: (todo: ViewDrizzleTodo) => Promise<void>;

  /**
   * readTodos: Retrieves all todo items from the database.
   *
   * @returns A Promise that resolves to an array of DrizzleTodoDTO objects.
   */
  readTodos: () => Promise<DrizzleTodoDTO[]>;

  /**
   * readTodoDetails: Retrieves details of a specific todo item from the database.
   *
   * @param id The ID of the todo item to retrieve details for.
   * @returns A Promise that resolves to a DrizzleTodoDTO object if found, otherwise undefined.
   */
  readTodoDetails: (id: string) => Promise<DrizzleTodoDTO | undefined>;

  /**
   * updateTodo: Updates an existing todo item in the database.
   *
   * @param todo A ViewDrizzleTodo object representing the updated todo item.
   */
  updateTodo: (todo: ViewDrizzleTodo) => Promise<void>;

  /**
   * deleteTodo: Deletes a todo item from the database.
   *
   * @param id The ID of the todo item to delete.
   */
  deleteTodo: (id: string) => Promise<void>;
};

/**
 * createTodo: Creates a new todo item in the database.
 *
 * @param todo A ViewDrizzleTodo object representing the todo item to be created.
 */
export const createTodo = async (todo: ViewDrizzleTodo) => {
  // Insert the provided todo item into the database
  await db.insert(todos).values(todo);
};

/**
 * readTodos: Retrieves a list of all todo items.
 *
 * @returns A Promise that resolves with an array of DrizzleTodoDTO objects, ordered by their updated_at timestamps in descending order.
 */
export const readTodos = async () => {
  const todoList: DrizzleTodoDTO[] = await db.query.todos.findMany({
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
 * @param todo A ViewDrizzleTodo object representing the updated todo item.
 */
export const updateTodo = async (todo: ViewDrizzleTodo) => {
  await db.update(todos).set(todo).where(eq(todos.id, todo.id));
};

/**
 * deleteTodo: Deletes a todo item.
 *
 * @param id A string representing the unique identifier of the todo item to be deleted.
 */
export const deleteTodo = async (id: string) => {
  await db.delete(todos).where(eq(todos.id, id));
};
