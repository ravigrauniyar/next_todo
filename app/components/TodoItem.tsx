import priorities from "@/utils/PrioritiesData.json";
import { ViewTodo } from "@/drizzle/schema";

type TodoItemProps = {
  todo: ViewTodo;
  handleClick: (route: string) => void;
};
enum StatusColor {
  Completed = "text-green-600",
  Pending = "text-yellow-600",
}
export function TodoItem(props: TodoItemProps) {
  const { id, title, description, priority, isCompleted } = props.todo;
  return (
    <div
      onClick={() => props.handleClick(`/todos/details?id=${id}`)}
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
          <div
            className={`${
              isCompleted ? StatusColor.Completed : StatusColor.Pending
            } ml-2`}
          >
            {isCompleted ? "Completed" : "Pending"}
          </div>
        </div>
      </div>
    </div>
  );
}
