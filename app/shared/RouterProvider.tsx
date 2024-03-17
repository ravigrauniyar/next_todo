import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

type RouterProps = {
  handleReturn: () => void;
  handleRedirect: (route: string) => void;
};
const RouterContext = createContext<RouterProps | null>(null);
export const useTodoRouter = () => useContext(RouterContext);

export const RouterProvider = ({ children }: ProviderProps) => {
  const router = useRouter();
  const handleReturn = router.back;
  const handleRedirect = router.push;

  const shared: RouterProps = {
    handleReturn,
    handleRedirect,
  };
  return (
    <RouterContext.Provider value={shared}>{children}</RouterContext.Provider>
  );
};
