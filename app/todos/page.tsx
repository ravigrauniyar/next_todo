"use client";

import _ from "lodash";
import "@/app/globals.css";
import Image from "next/image";
import { Todo } from "@/drizzle/schema";
import Loading from "@/icons/Loading.svg";
import { useEffect, useState } from "react";
import { useTodo } from "@/shared/TodoProvider";
import { TodoItem } from "@/components/TodoItem";
import { readTodos } from "@/database/operations";
import { useTodoRouter } from "@/shared/RouterProvider";

export default function TodoList() {
  const { todos, setTodos } = useTodo()!;
  const { handleRedirect } = useTodoRouter()!;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    readTodos()
      .then((todoList: Todo[]) => {
        setTodos(todoList);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [setTodos]);

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
              {_.map(todos, (todo) => {
                return (
                  <div key={todo.id}>
                    <TodoItem todo={todo} />
                  </div>
                );
              })}
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
