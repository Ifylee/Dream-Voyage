import { createContext, useReducer, useContext } from "react";
import { globalStateReducer, initialState } from "./reducers.js";

// creates the context
const GlobalStateContext = createContext();

// Custom hook to use the GlobalState
export const useGlobalState = () => useContext(GlobalStateContext);

// This creates a provider component
export const GlobalStateProvider = ({ children }) => {
  // Use the globalStateReducer to manage state
  const [state, dispatch] = useReducer(globalStateReducer, {
    cart: [],
    isAuthenticated: false,
    trips: [],
    categories: [],
    currentCategory: "",
  });

  return (
    <GlobalStateContext.Provider value={[state, dispatch] }>
      {children}
    </GlobalStateContext.Provider>
  );
};
