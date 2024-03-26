"use client";

import { StatusColor } from "./constants.enum";
import { DrizzleTodoDTO } from "@/drizzle/schema";
import priorities from "@/utils/PrioritiesData.json";
import { useTodoRouter } from "@/shared/RouterProvider";

/**
 * TodoItemProps: Represents the props expected by the TodoItem component.
 *
 * Props:
 * - todo: The todo item to be displayed by the TodoItem component.
 */
type TodoItemProps = {
  todo: DrizzleTodoDTO;
};

/**
 * TodoItem: Represents the component for displaying an individual todo item.
 *
 * Props:
 * - todo: The todo item to be displayed.
 *
 * Hooks Used:
 * - useTodoRouter: A hook for handling routing related to todo items.
 *
 * Returns:
 * - A clickable todo item with title, description, priority, and status.
 */
export function TodoItem({ todo }: TodoItemProps) {
  // Accessing router-related functions
  const { handleRedirect } = useTodoRouter()!;

  // Destructuring todo object
  const { id, title, description, priority, isCompleted } = todo;

  // Determine status color based on completion status
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
