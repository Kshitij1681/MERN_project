// import React from "react";
import { createContext, useReducer, useState } from "react";
import Routing from "./AppRouter/Routing";
import { initialState, reducer } from "./reducer/reducer";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import "./App.css";

export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [progress, setProgress] = useState(0);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch, setProgress }}>
        <LoadingBar progress={progress} onLoaderFinished={() => setProgress(0)} />
        <ToastContainer />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
