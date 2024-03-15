"use client";
import _ from "lodash";
import "@/app/globals.css";
import Modal from "./Modal";
import priorities from "@/utils/PrioritiesData.json";
import { Todo, ViewTodo } from "@/drizzle/schema";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createTodo,
  readTodoDetails,
  updateTodo,
} from "@/database/operations";

export default function Form(props: { type: string }) {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const { type } = props;
  const title = type === "Create" ? "Add Todo" : "Update Todo";

  const [todoItem, setTodoItem] = useState<ViewTodo>({
    id: uuidv4(),
    title: "",
    description: "",
    priority: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isCompleted: false,
  });

  useEffect(() => {
    if (type === "Update" && id) {
      readTodoDetails(id as string).then((todoDetail: Todo | undefined) => {
        if (todoDetail) {
          setTodoItem(todoDetail);
        }
      });
    }
  }, [id, type]);

  const [isUpdateModalActive, setIsUpdateModalActive] =
    useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "Create") {
      await createTodo(todoItem);
      router.push("/todos");
    } else {
      setIsUpdateModalActive(true);
    }
  };
  const handleUpdateTodo = async () => {
    const todo = { ...todoItem, updated_at: new Date().toISOString() };
    await updateTodo(todo);
    setIsUpdateModalActive(false);
    router.back();
  };
  return (
    <div className="flex-center h-screen">
      {!isUpdateModalActive ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-gray-600 rounded-sm px-3 py-5 gap-5"
        >
          <div className="text-[30px] font-[500]">{title}</div>
          <input
            type="text"
            value={todoItem.title!}
            className="outline-none focus:outline-none text-black h-[40px] px-3 rounded-md"
            placeholder="Title"
            onChange={(e) =>
              setTodoItem({ ...todoItem, title: e.target.value })
            }
            required
          />
          <textarea
            className="w-full outline-none focus:outline-none min-h-[100px] text-black h-[40px] px-3 pt-2 rounded-md"
            value={todoItem.description!}
            placeholder="Description"
            onChange={(e) =>
              setTodoItem({ ...todoItem, description: e.target.value })
            }
          />
          <div className="w-full">
            <div className="mb-2 font-[500]">Priority</div>
            <select
              name="priority"
              value={priorities[todoItem.priority!]}
              id="priority"
              className="w-full h-[40px] outline-none focus:outline-none px-3 bg-white text-black"
              onChange={(e) =>
                setTodoItem({
                  ...todoItem,
                  priority: _.findIndex(
                    priorities,
                    (priority) => priority === e.target.value
                  ),
                })
              }
            >
              {_.map(priorities, (priority, index) => {
                return (
                  <option key={index} value={priority}>
                    {priority}
                  </option>
                );
              })}
            </select>
          </div>
          {type !== "Create" && (
            <div className="flex w-full h-[40px] items-center justify-start">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] mr-2 mt-[-3px]"
                checked={todoItem.isCompleted!}
                onClick={() =>
                  setTodoItem({
                    ...todoItem,
                    isCompleted: !todoItem.isCompleted,
                  })
                }
              />
              Completed
            </div>
          )}
          <div className="flex w-full gap-5">
            <button
              type="submit"
              className="btn flex-center bg-gray-500 hover:bg-gray-700"
            >
              Submit
            </button>
            <button
              onClick={() => router.back()}
              className="btn flex-center bg-red-500 hover:bg-red-600"
            >
              Return
            </button>
          </div>
        </form>
      ) : (
        <Modal
          type="Update"
          title={todoItem.title!}
          onConfirm={() => handleUpdateTodo()}
          onCancel={() => setIsUpdateModalActive(false)}
        />
      )}
    </div>
  );
}
