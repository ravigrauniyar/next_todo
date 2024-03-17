import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

/**
 * RouterProps: Represents the props of the router context.
 *
 * Properties:
 * - handleReturn: A function to handle navigation back.
 * - handleRedirect: A function to handle navigation redirection.
 */
type RouterProps = {
  handleReturn: () => void;
  handleRedirect: (route: string) => void;
};

/**
 * RouterContext: A context for managing router-related functions.
 */
const RouterContext = createContext<RouterProps | null>(null);

/**
 * useTodoRouter: A custom hook to access the router context.
 *
 * Returns:
 * - An object containing functions to handle navigation back and redirection.
 */
export const useTodoRouter = () => useContext(RouterContext);

/**
 * RouterProvider: A component to provide router context to its children.
 *
 * Props:
 * - children: React node representing the children components.
 */
export const RouterProvider = ({ children }: ProviderProps) => {
  // Access router instance from Next.js useRouter hook
  const router = useRouter();

  // Set up functions to handle navigation back and redirection
  const handleReturn = router.back;
  const handleRedirect = router.push;

  // Create a shared context value
  const shared: RouterProps = {
    handleReturn,
    handleRedirect,
  };

  // Provide the context value to its children
  return (
    <RouterContext.Provider value={shared}>{children}</RouterContext.Provider>
  );
};
