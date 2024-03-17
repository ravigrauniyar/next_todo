import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

/**
 * FlagStatesContextProps: Represents the props of the flag states context.
 *
 * Properties:
 * - flagStates: A FlagStates object representing various flag states.
 * - setFlagStates: A function to update the flag states.
 */
type FlagStatesContextProps = {
  flagStates: FlagStates;
  setFlagStates: Dispatch<SetStateAction<FlagStates>>;
};

/**
 * FlagStatesContext: A context for managing flag states.
 */
const FlagStatesContext = createContext<FlagStatesContextProps | null>(null);

/**
 * useFlagStates: A custom hook to access the flag states context.
 *
 * Returns:
 * - An object containing flag states and a function to update them.
 */
export const useFlagStates = () => useContext(FlagStatesContext);

/**
 * FlagStatesProvider: A component to provide flag states context to its children.
 *
 * Props:
 * - children: React node representing the children components.
 */
export const FlagStatesProvider = ({ children }: ProviderProps) => {
  // Initialize flag states
  const initialFlagStates: FlagStates = {
    isUpdateFormOpen: false,
    isUpdateModalOpen: false,
    isDeleteModalOpen: false,
  };

  // Set up state for flag states and their updater function
  const [flagStates, setFlagStates] = useState<FlagStates>(initialFlagStates);

  // Create a shared context value
  const shared: FlagStatesContextProps = {
    flagStates,
    setFlagStates,
  };

  // Provide the context value to its children
  return (
    <FlagStatesContext.Provider value={shared}>
      {children}
    </FlagStatesContext.Provider>
  );
};
