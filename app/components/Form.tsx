"use client";

import _ from "lodash";
import "@/app/globals.css";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import { FormTitle } from "./constants.enum";
import { Todo, ViewTodo } from "@/drizzle/schema";
import priorities from "@/utils/PrioritiesData.json";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createTodo, readTodoDetails, updateTodo } from "@/database/operations";

export default function Form(props: FormProps) {
  const router = useRouter();
  const params = useSearchParams();

  const { type, onReturn } = props;
  const title = type === "New" ? FormTitle.New : FormTitle.Update;
  const handleReturn = () => (type === "New" ? router.back() : onReturn!());

  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [todoItem, setTodoItem] = useState<ViewTodo>({
    id: uuidv4(),
    title: "",
    description: "",
    priority: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isCompleted: false,
  });
  const [isUpdateModalActive, setIsUpdateModalActive] =
    useState<boolean>(false);

  const id = params.get("id");
  useEffect(() => {
    if (type === "Update" && id) {
      readTodoDetails(id as string).then((todoDetail: Todo | undefined) => {
        if (todoDetail) {
          setTodoItem(todoDetail);
          setCurrentTitle(todoDetail.title!);
        }
      });
    }
  }, [id, type]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "New") {
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
    onReturn!();
  };
  const elementStyles =
    "w-full h-[40px] outline-none focus:outline-none px-3 rounded-md";

  return (
    <div className="flex-center h-screen">
      {!isUpdateModalActive ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-600 rounded-sm px-3 py-5 gap-5"
        >
          <div className="text-[30px] font-[500] text-center">{title}</div>
          <input
            type="text"
            value={todoItem.title!}
            className={`${elementStyles} text-black`}
            placeholder="Title"
            onChange={(e) =>
              setTodoItem({ ...todoItem, title: e.target.value })
            }
            required
          />
          <textarea
            className={`${elementStyles} pt-2 text-black min-h-[100px]`}
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
              className={`${elementStyles} bg-white text-black`}
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
          {type !== "New" && (
            <div className="flex w-full h-[40px] items-center justify-start">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] mr-2 mt-[-3px]"
                checked={todoItem.isCompleted!}
                onChange={() =>
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
              onClick={handleReturn}
              className="btn flex-center bg-red-500 hover:bg-red-600"
            >
              Return
            </button>
          </div>
        </form>
      ) : (
        <Modal
          type="Update"
          title={currentTitle}
          onConfirm={() => handleUpdateTodo()}
          onCancel={() => setIsUpdateModalActive(false)}
        />
      )}
    </div>
  );
}
