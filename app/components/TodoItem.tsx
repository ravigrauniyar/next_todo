"use client";

import { ViewTodo } from "@/drizzle/schema";
import { StatusColor } from "./constants.enum";
import priorities from "@/utils/PrioritiesData.json";

type TodoItemProps = {
  todo: ViewTodo;
  handleClick: (route: string) => void;
};
export function TodoItem(props: TodoItemProps) {
  const { id, title, description, priority, isCompleted } = props.todo;
  const statusColor = isCompleted ? StatusColor.Completed : StatusColor.Pending;
  return (
    <div
      onClick={() => props.handleClick(`/todos/view?id=${id}`)}
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
