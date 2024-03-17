import { TodoProvider } from "./TodoProvider";
import { RouterProvider } from "./RouterProvider";
import { FlagStatesProvider } from "./FlagStatesProvider";

export const Provider = ({ children }: ProviderProps) => {
  return (
    <RouterProvider>
      <TodoProvider>
        <FlagStatesProvider>{children}</FlagStatesProvider>
      </TodoProvider>
    </RouterProvider>
  );
};
