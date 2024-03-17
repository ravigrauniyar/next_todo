import { TodoProvider } from "./TodoProvider";
import { RouterProvider } from "./RouterProvider";
import { FlagStatesProvider } from "./FlagStatesProvider";

/**
 * Provider: A component that serves as a provider for its children components.
 *
 * Props:
 * - children: A React node representing the children components.
 *
 * Providers Used:
 * - RouterProvider: Provides routing capabilities to its children components.
 * - TodoProvider: Provides todo-related context or state to its children components.
 * - FlagStatesProvider: Provides flag states context or state to its children components.
 */
export const Provider = ({ children }: ProviderProps) => {
  return (
    <RouterProvider>
      <TodoProvider>
        <FlagStatesProvider>{children}</FlagStatesProvider>
      </TodoProvider>
    </RouterProvider>
  );
};
