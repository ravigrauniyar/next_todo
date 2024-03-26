"use client";

import _ from "lodash";
import "@/app/globals.css";
import moment from "moment";
import Image from "next/image";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Loading from "@/icons/Loading.svg";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTodo } from "@/shared/TodoProvider";
import { DrizzleTodoDTO } from "@/drizzle/schema";
import priorities from "@/utils/PrioritiesData.json";
import { useTodoRouter } from "@/shared/RouterProvider";
import { useDatabase } from "@/shared/DbContextProvider";
import { useFlagStates } from "@/shared/FlagStatesProvider";

/**
 * ViewTodo: Represents the component for viewing a single todo item.
 *
 * Hooks Used:
 * - useTodoRouter: A hook for handling routing related to todo items.
 * - useParams: A hook for accessing parameters from the URL.
 * - useTodo: A hook for accessing todo-related context or state.
 * - useState: A hook for managing component state.
 * - useEffect: A hook for handling side effects in function components.
 * - useFlagStates: A hook for accessing flag states related to the component.
 *
 * Actions:
 * - Retrieves the todo item details based on the provided ID when the component mounts.
 * - Sets loading state while fetching data.
 * - Redirects to the todos page if the todo item does not exist.
 * - Handles deletion of the todo item.
 *
 * Returns:
 * - A page title and the view of the todo item.
 */
export default function ViewTodo() {
  // Accessing router-related functions
  const { handleRedirect } = useTodoRouter()!;
  const params = useParams<{ id: string }>();

  // Accessing todo-related context and state
  const { todo, setTodo } = useTodo()!;

  // Access database-related functions for fetching details and deleting todo items
  const { readTodoDetails, deleteTodo } = useDatabase()!;

  // Managing loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Accessing flag states and related functions
  const { flagStates, setFlagStates } = useFlagStates()!;
  const { isUpdateFormOpen, isDeleteModalOpen } = flagStates;

  const id = params.id;

  // Fetch todo item details when the component mounts
  useEffect(() => {
    if (!isUpdateFormOpen) {
      setLoading(true);

      readTodoDetails(id!)
        .then((todoDetail: DrizzleTodoDTO | TodoDTO | null | undefined) => {
          if (todoDetail) {
            setTodo(todoDetail as TodoDTO);
          } else {
            handleRedirect("/todos");
          }
        })
        .catch((error: Error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [id, isUpdateFormOpen, setTodo, handleRedirect, readTodoDetails]);

  // Function to set delete modal open/close state
  const setIsDeleteModalOpen = (value: boolean) => {
    setFlagStates({
      ...flagStates,
      isDeleteModalOpen: value,
    });
  };

  // Function to handle deletion of the todo item
  const handleDelete = async () => {
    await deleteTodo(id!);
    setLoading(true);
    setIsDeleteModalOpen(false);
    handleRedirect("/todos");
  };

  // Inline styles for buttons
  const btnStyles = "text-black border-b cursor-pointer hover:text-white";

  return (
    <div className="flex-center h-screen">
      <title>View | TODO</title>
      {loading || _.isEmpty(todo.title) ? (
        <Image
          src={Loading}
          width={50}
          height={50}
          alt="LoadingIcon"
          priority={true}
        />
      ) : isUpdateFormOpen ? (
        <Form type="Update" />
      ) : isDeleteModalOpen ? (
        <Modal
          type="delete"
          title={todo.title!}
          onConfirm={() => handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      ) : (
        <div className="flex flex-col p-5 bg-gray-600 w-[400px] rounded-sm gap-5">
          <div className="text-[32px] font-[500] text-center">
            DrizzleTodoDTO
          </div>
          <div>{todo.title}</div>
          {todo.description && <div>{todo.description}</div>}

          <div>Priority: {priorities[todo.priority!]}</div>
          <div>Status: {todo.isCompleted ? "Completed" : "Pending"}</div>
          <div>
            Added on: {moment(todo.created_at).format("hh:mm A, DD MMM YYYY")}
          </div>
          <div>
            Last updated:{" "}
            {moment(todo.updated_at).format("hh:mm A, DD MMM YYYY")}
          </div>

          <div className="flex gap-5">
            <div
              onClick={() =>
                setFlagStates({
                  ...flagStates,
                  isUpdateFormOpen: true,
                })
              }
              className={btnStyles}
            >
              Update
            </div>
            <div
              onClick={() => setIsDeleteModalOpen(true)}
              className={btnStyles}
            >
              Delete
            </div>
            <div onClick={() => handleRedirect("/todos")} className={btnStyles}>
              Return
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
