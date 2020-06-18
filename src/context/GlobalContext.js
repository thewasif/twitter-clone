import React, { useReducer, createContext } from "react";
import reducer from "./reducer";

let initialState = { styles: { left: -300 } };

export const GlobalContext = createContext(initialState);

export function Provider({ children }) {
  let [state, dispatch] = useReducer(reducer, initialState);

  const changeStyles = (newStyles) => {
    dispatch({
      type: "CHANGE",
      styles: newStyles,
    });
  };
  return (
    <GlobalContext.Provider value={{ state, changeStyles }}>
      {children}
    </GlobalContext.Provider>
  );
}
