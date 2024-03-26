"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * createTodo: Creates a new todo item.
 *
 * @param todo A ViewDrizzleTodo object representing the todo item to be created.
 */
export const createTodo = async (todo: TodoDTO) => {
  await prisma.todos.create({ data: todo });
};

/**
 * readTodos: Retrieves a list of all todo items.
 *
 * @returns A Promise that resolves with an array of DrizzleTodoDTO objects, ordered by their updated_at timestamps in descending order.
 */
export const readTodos = async () => {
  return await prisma.todos.findMany({ orderBy: { updated_at: "desc" } });
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
 * @param todo A ViewDrizzleTodo object representing the updated todo item.
 */
export const updateTodo = async (todo: TodoDTO) => {
  const { id, ...updateData } = todo;
  await prisma.todos.update({ where: { id }, data: updateData });
};

/**
 * deleteTodo: Deletes a todo item.
 *
 * @param id A string representing the unique identifier of the todo item to be deleted.
 */
export const deleteTodo = async (id: string) => {
  await prisma.todos.delete({ where: { id } });
};
