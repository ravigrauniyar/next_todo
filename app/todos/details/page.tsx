"use client";
import "@/app/globals.css";
import priorities from "@/utils/PrioritiesData.json";
import moment from "moment";
import Modal from "@/components/Modal";
import { Todo } from "@/drizzle/schema";
import { deleteTodo, readTodoDetails } from "@/database/operations";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Details() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const [isDeleteModalActive, setIsDeleteModalActive] =
    useState<boolean>(false);
  const [todo, setTodo] = useState<Todo | null>(null);

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
        {!isDeleteModalActive ? (
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
                onClick={() => router.push(`/todos/update?id=${id}`)}
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
        ) : (
          <Modal
            type="delete"
            title={todo.title!}
            onConfirm={() => handleDelete()}
            onCancel={() => setIsDeleteModalActive(false)}
          />
        )}
      </div>
    )
  );
}
