"use client";

import _ from "lodash";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TodoItem } from "@/components/TodoItem";
import { readTodos } from "@/database/operations";
import { Todo, ViewTodo } from "@/drizzle/schema";

type TodoItemProps = {
  todo: ViewTodo;
  handleClick: (route: string) => void;
};
export default function TodoList() {
  const router = useRouter();
  const handleRedirect = (route: string) => {
    router.push(route);
  };
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    readTodos().then((todoList: Todo[]) => {
      setTodos(todoList);
    });
  }, []);

  const scrollBarStyles =
    "scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600";

  return (
    <div className="flex-center h-screen">
      <title>Home | TODO</title>
      <div className="flex flex-col w-2/5 bg-gray-600 p-5 rounded-sm h-[90vh]">
        {_.isEmpty(todos) ? (
          <div className="text-[30px] mt-5">No Entry in Todo list yet.</div>
        ) : (
          <div
            className={`flex flex-col max-h-[77vh] overflow-y-auto ${scrollBarStyles}`}
          >
            <div className="font-[500] text-[20px] text-center">TODO List</div>
            {_.map(todos, (todo) => {
              const props: TodoItemProps = {
                todo: todo,
                handleClick: handleRedirect,
              };
              return (
                <div key={todo.id}>
                  <TodoItem {...props} />
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
    </div>
  );
}
