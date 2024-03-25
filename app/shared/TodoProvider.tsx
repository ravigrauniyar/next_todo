import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, ViewTodo } from "@/drizzle/schema";

/**
 * todoExample: Represents an example todo item.
 */
export const todoExample: Todo = {
  id: uuidv4(),
  title: "",
  description: "",
  priority: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  isCompleted: false,
};

/**
 * ContextProps: Represents the props of the todo context.
 *
 * Properties:
 * - todo: The currently selected todo item.
 * - todos: An array of todo items.
 * - todoForFormValues: A todo item used for form values.
 * - setTodo: A function to update the currently selected todo item.
 * - setTodos: A function to update the array of todo items.
 * - setTodoForFormValues: A function to update the todo item used for form values.
 */
type TodoContextProps = {
  todo: ViewTodo;
  todos: Todo[] | null;
  todoForFormValues: Todo;
  setTodo: Dispatch<SetStateAction<ViewTodo>>;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
  setTodoForFormValues: Dispatch<SetStateAction<Todo>>;
};

/**
 * TodoContext: A context for managing todo-related state.
 */
const TodoContext = createContext<TodoContextProps | null>(null);

/**
 * useTodo: A custom hook to access the todo context.
 *
 * Returns:
 * - An object containing todo-related state and updater functions.
 */
export const useTodo = () => useContext(TodoContext);

/**
 * TodoProvider: A component to provide todo context to its children.
 *
 * Props:
 * - children: React node representing the children components.
 */
export const TodoProvider = ({ children }: ProviderProps) => {
  // Initialize todo-related state
  const [todo, setTodo] = useState<ViewTodo>(todoExample);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoForFormValues, setTodoForFormValues] = useState<Todo>(todoExample);

  // Create a shared context value
  const shared: TodoContextProps = {
    todo,
    todos,
    todoForFormValues,
    setTodo,
    setTodos,
    setTodoForFormValues,
  };

  // Provide the context value to its children
  return <TodoContext.Provider value={shared}>{children}</TodoContext.Provider>;
};
