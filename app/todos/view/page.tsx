"use client";

import "@/app/globals.css";
import moment from "moment";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { Todo } from "@/drizzle/schema";
import { useEffect, useState } from "react";
import priorities from "@/utils/PrioritiesData.json";
import { useSearchParams, useRouter } from "next/navigation";
import { deleteTodo, readTodoDetails } from "@/database/operations";

export default function View() {
  const router = useRouter();
  const params = useSearchParams();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [isUpdateFormActive, setIsUpdateFormActive] = useState<boolean>(false);
  const [isDeleteModalActive, setIsDeleteModalActive] =
    useState<boolean>(false);

  const id = params.get("id");
  useEffect(() => {
    readTodoDetails(id! as string).then((todoDetail: Todo | undefined) => {
      if (todoDetail) {
        setTodo(todoDetail);
      } else {
        router.push("/todos");
      }
    });
  }, [id, router]);

  const handleDelete = async () => {
    await deleteTodo(id!);
    setIsDeleteModalActive(false);
    router.push("/todos");
  };
  const btnStyles = "text-black border-b cursor-pointer hover:text-white";

  return (
    todo && (
      <div className="flex-center h-screen">
        <title>View | TODO</title>
        {!isDeleteModalActive && !isUpdateFormActive ? (
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
                onClick={() => setIsUpdateFormActive(true)}
                className={btnStyles}
              >
                Update
              </div>
              <div
                onClick={() => setIsDeleteModalActive(true)}
                className={btnStyles}
              >
                Delete
              </div>
              <div onClick={() => router.push("/todos")} className={btnStyles}>
                Return
              </div>
            </div>
          </div>
        ) : isDeleteModalActive ? (
          <Modal
            type="delete"
            title={todo.title!}
            onConfirm={() => handleDelete()}
            onCancel={() => setIsDeleteModalActive(false)}
          />
        ) : (
          <Form type="Update" onReturn={() => setIsUpdateFormActive(false)} />
        )}
      </div>
    )
  );
}
