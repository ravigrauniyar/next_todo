"use client";

import _ from "lodash";
import "@/app/globals.css";
import Image from "next/image";
import Loading from "@/icons/Loading.svg";
import { useEffect, useState } from "react";
import { useTodo } from "@/shared/TodoProvider";
import { TodoItem } from "@/components/TodoItem";
import { DrizzleTodoDTO } from "@/drizzle/schema";
import { useTodoRouter } from "@/shared/RouterProvider";
import { useDatabase } from "@/shared/DbContextProvider";

/**
 * TodoList: Represents the component for displaying a list of todo items.
 *
 * Hooks Used:
 * - useState: A hook for managing component state.
 * - useEffect: A hook for handling side effects in function components.
 * - useTodo: A hook for accessing todo-related context or state.
 * - useTodoRouter: A hook for handling routing related to todo items.
 *
 * Actions:
 * - Fetches todo items from the database when the component mounts.
 *
 * Returns:
 * - A page title and a list of todo items with an option to add a new todo.
 */
export default function TodoList() {
  // Accessing todo-related context and state
  const { todos, setTodos } = useTodo()!;

  // Accessing router-related functions
  const { handleRedirect } = useTodoRouter()!;

  const { readTodos } = useDatabase()!;

  // Managing loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch todo items from the database when the component mounts
  useEffect(() => {
    setLoading(true);
    readTodos()
      .then((todoList: Todo[]) => {
        setTodos(todoList);
      })
      .catch((error: Error) => console.error(error))
      .finally(() => setLoading(false));
  }, [readTodos, setTodos]);

  // Inline styles for scrollbar
  const scrollBarStyles =
    "scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600";

  return (
    <div className="flex-center h-screen">
      <title>Home | TODO</title>
      {loading || _.isNull(todos) ? (
        <Image src={Loading} width={50} height={50} alt="LoadingIcon" />
      ) : (
        <div className="flex flex-col w-2/5 bg-gray-600 p-5 rounded-sm h-[90vh]">
          {_.isEmpty(todos) ? (
            <div className="text-[30px] mt-5">No Entry in Todo list yet.</div>
          ) : (
            <div
              className={`flex flex-col max-h-[77vh] overflow-y-auto ${scrollBarStyles}`}
            >
              <div className="font-[500] text-[20px] text-center">
                TODO List
              </div>
              {_.map(todos, (todo) => (
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => handleRedirect("/todos/new")}
            className="text-[16px] btn bg-gray-500 hover:bg-gray-700 mt-5"
          >
            Add Todo
          </button>
        </div>
      )}
    </div>
  );
}
