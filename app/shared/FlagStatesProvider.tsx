import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

type FlagStatesContextProps = {
  flagStates: FlagStates;
  setFlagStates: Dispatch<SetStateAction<FlagStates>>;
};
const FlagStatesContext = createContext<FlagStatesContextProps | null>(null);
export const useFlagStates = () => useContext(FlagStatesContext);

export const FlagStatesProvider = ({ children }: ProviderProps) => {
  const initialFlagStates: FlagStates = {
    isUpdateFormOpen: false,
    isUpdateModalOpen: false,
    isDeleteModalOpen: false,
  };
  const [flagStates, setFlagStates] = useState<FlagStates>(initialFlagStates);
  const shared: FlagStatesContextProps = {
    flagStates,
    setFlagStates,
  };
  return (
    <FlagStatesContext.Provider value={shared}>
      {children}
    </FlagStatesContext.Provider>
  );
};
