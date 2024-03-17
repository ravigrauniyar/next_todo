"use client";

import _ from "lodash";
import "@/app/globals.css";
import moment from "moment";
import Image from "next/image";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { Todo } from "@/drizzle/schema";
import Loading from "@/icons/Loading.svg";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTodo } from "@/shared/TodoProvider";
import priorities from "@/utils/PrioritiesData.json";
import { useTodoRouter } from "@/shared/RouterProvider";
import { useFlagStates } from "@/shared/FlagStatesProvider";
import { deleteTodo, readTodoDetails } from "@/database/operations";

export default function View() {
  const { handleRedirect } = useTodoRouter()!;
  const params = useParams<{ id: string }>();

  const { todo, setTodo } = useTodo()!;
  const [loading, setLoading] = useState<boolean>(false);

  const { flagStates, setFlagStates } = useFlagStates()!;
  const { isUpdateFormOpen, isDeleteModalOpen } = flagStates;

  const id = params.id;
  useEffect(() => {
    if (!isUpdateFormOpen) {
      setLoading(true);

      readTodoDetails(id! as string)
        .then((todoDetail: Todo | undefined) => {
          if (todoDetail) {
            setTodo(todoDetail);
          } else {
            handleRedirect("/todos");
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [id, isUpdateFormOpen, setTodo, handleRedirect]);

  const setIsDeleteModalOpen = (value: boolean) => {
    setFlagStates({
      ...flagStates,
      isDeleteModalOpen: value,
    });
  };
  const handleDelete = async () => {
    await deleteTodo(id!);
    setLoading(true);
    setIsDeleteModalOpen(false);
    handleRedirect("/todos");
  };
  const btnStyles = "text-black border-b cursor-pointer hover:text-white";

  return (
    <div className="flex-center h-screen">
      <title>View | TODO</title>
      {loading || _.isEmpty(todo.title) ? (
        <Image src={Loading} width={50} height={50} alt="LoadingIcon" />
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
          <div className="text-[32px] font-[500] text-center">Todo</div>
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
