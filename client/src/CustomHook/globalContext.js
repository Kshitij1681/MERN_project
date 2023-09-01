import { UserContext } from "../App";
import { useContext } from "react";

const useGlobalContext = () => {
  return useContext(UserContext);
};

export default useGlobalContext;
