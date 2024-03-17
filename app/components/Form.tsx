"use client";

import _ from "lodash";
import "@/app/globals.css";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/drizzle/schema";
import { useParams } from "next/navigation";
import { FormTitle } from "./constants.enum";
import { useTodo } from "@/shared/TodoProvider";
import priorities from "@/utils/PrioritiesData.json";
import { FormEvent, useEffect, useState } from "react";
import { useTodoRouter } from "@/shared/RouterProvider";
import { useFlagStates } from "@/shared/FlagStatesProvider";
import { createTodo, readTodoDetails, updateTodo } from "@/database/operations";

export default function Form({ type }: FormProps) {
  const { handleReturn, handleRedirect } = useTodoRouter()!;
  const params = useParams<{ id: string }>();

  const formTitle = type === "New" ? FormTitle.New : FormTitle.Update;
  const currentTodoTitle = useTodo()?.todo?.title;

  const { flagStates, setFlagStates } = useFlagStates()!;
  const isUpdateModalOpen = flagStates.isUpdateModalOpen;
  const { todoForFormValues, setTodoForFormValues } = useTodo()!;

  const id = params.id;
  useEffect(() => {
    if (type === "Update" && id) {
      readTodoDetails(id as string).then((todoDetail: Todo | undefined) => {
        if (todoDetail) {
          setTodoForFormValues(todoDetail);
        }
      });
    }
  }, [id, type, setTodoForFormValues]);

  const handleCancel = () => {
    return type === "New"
      ? handleReturn()
      : setFlagStates({
          ...flagStates,
          isUpdateFormOpen: false,
        });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "New") {
      await createTodo({
        ...todoForFormValues,
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      handleRedirect("/todos");
    } else {
      setFlagStates({
        ...flagStates,
        isUpdateModalOpen: true,
      });
    }
  };
  const handleUpdateTodo = async () => {
    const todo = { ...todoForFormValues, updated_at: new Date().toISOString() };
    await updateTodo(todo);

    setFlagStates({
      ...flagStates,
      isUpdateFormOpen: false,
      isUpdateModalOpen: false,
    });
  };
  const elementStyles =
    "w-full h-[40px] outline-none focus:outline-none px-3 rounded-md";

  return (
    <div className="flex-center h-screen">
      {!isUpdateModalOpen ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-600 rounded-sm px-3 py-5 gap-5"
        >
          <div className="text-[30px] font-[500] text-center">{formTitle}</div>
          <input
            type="text"
            value={todoForFormValues.title!}
            className={`${elementStyles} text-black`}
            placeholder="Title"
            onChange={(e) =>
              setTodoForFormValues({
                ...todoForFormValues,
                title: e.target.value,
              })
            }
            required
          />
          <textarea
            className={`${elementStyles} pt-2 text-black min-h-[100px]`}
            value={todoForFormValues.description!}
            placeholder="Description"
            onChange={(e) =>
              setTodoForFormValues({
                ...todoForFormValues,
                description: e.target.value,
              })
            }
          />
          <div className="w-full">
            <div className="mb-2 font-[500]">Priority</div>
            <select
              name="priority"
              value={priorities[todoForFormValues.priority!]}
              id="priority"
              className={`${elementStyles} bg-white text-black`}
              onChange={(e) =>
                setTodoForFormValues({
                  ...todoForFormValues,
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
                checked={todoForFormValues.isCompleted!}
                onChange={() =>
                  setTodoForFormValues({
                    ...todoForFormValues,
                    isCompleted: !todoForFormValues.isCompleted,
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
              onClick={handleCancel}
              className="btn flex-center bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <Modal
          type="Update"
          title={currentTodoTitle!}
          onConfirm={() => handleUpdateTodo()}
          onCancel={() =>
            setFlagStates({
              ...flagStates,
              isUpdateModalOpen: false,
            })
          }
        />
      )}
    </div>
  );
}
