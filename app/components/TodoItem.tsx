"use client";

import { Todo } from "@/drizzle/schema";
import { StatusColor } from "./constants.enum";
import priorities from "@/utils/PrioritiesData.json";
import { useTodoRouter } from "@/shared/RouterProvider";

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const { handleRedirect } = useTodoRouter()!;
  const { id, title, description, priority, isCompleted } = todo;
  const statusColor = isCompleted ? StatusColor.Completed : StatusColor.Pending;

  return (
    <div
      onClick={() => handleRedirect(`/todos/view/${id}`)}
      className="flex flex-col p-3 border-b cursor-pointer"
    >
      <div className="flex justify-between mb-2 text-[18px]">
        <div className="truncate w-1/2">{title}</div>
        <div>Priority: {priorities[priority!]}</div>
      </div>

      <div className="flex justify-between text-[16px]">
        <div className="truncate w-1/2">{description}</div>

        <div className="flex">
          Status:
          <div className={`${statusColor} ml-2`}>
            {isCompleted ? "Completed" : "Pending"}
          </div>
        </div>
      </div>
    </div>
  );
}
