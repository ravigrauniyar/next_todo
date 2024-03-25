"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * createTodo: Creates a new todo item.
 *
 * @param todo A ViewTodo object representing the todo item to be created.
 * @returns A Promise that resolves when the todo item is successfully created.
 */
export const createTodo = async (todo: Todo) => {
  return await prisma.todos.create({ data: todo });
};

/**
 * readTodos: Retrieves a list of all todo items.
 *
 * @returns A Promise that resolves with an array of Todo objects, ordered by their updated_at timestamps in descending order.
 */
export const readTodos = async () => {
  return await prisma.todos.findMany();
};

/**
 * readTodoDetails: Retrieves details of a specific todo item.
 *
 * @param id A string representing the unique identifier of the todo item.
 * @returns A Promise that resolves with the details of the specified todo item.
 */
export const readTodoDetails = async (id: string) => {
  return await prisma.todos.findUnique({ where: { id } });
};

/**
 * updateTodo: Updates an existing todo item.
 *
 * @param todo A ViewTodo object representing the updated todo item.
 * @returns A Promise that resolves when the todo item is successfully updated.
 */
export const updateTodo = async (todo: Todo) => {
  const { id, ...updateData } = todo;
  return await prisma.todos.update({ where: { id }, data: updateData });
};

/**
 * deleteTodo: Deletes a todo item.
 *
 * @param id A string representing the unique identifier of the todo item to be deleted.
 * @returns A Promise that resolves when the todo item is successfully deleted.
 */
export const deleteTodo = async (id: string) => {
  return await prisma.todos.delete({ where: { id } });
};
