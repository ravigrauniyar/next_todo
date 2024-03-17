import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, ViewTodo } from "@/drizzle/schema";

export const todoExample: Todo = {
  id: uuidv4(),
  title: "",
  description: "",
  priority: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  isCompleted: false,
};

type ContextProps = {
  todo: ViewTodo;
  todos: Todo[] | null;
  todoForFormValues: Todo;
  setTodo: Dispatch<SetStateAction<ViewTodo>>;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
  setTodoForFormValues: Dispatch<SetStateAction<Todo>>;
};

const TodoContext = createContext<ContextProps | null>(null);
export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }: ProviderProps) => {
  const [todo, setTodo] = useState<ViewTodo>(todoExample);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoForFormValues, setTodoForFormValues] = useState<Todo>(todoExample);

  const shared: ContextProps = {
    todo,
    todos,
    todoForFormValues,
    setTodo,
    setTodos,
    setTodoForFormValues,
  };
  return <TodoContext.Provider value={shared}>{children}</TodoContext.Provider>;
};
