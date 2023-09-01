// import React from "react";
import AtomicSpinner from "atomic-spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../CustomHook/globalContext";
import { Notify } from "../Notification/toastify";

const Logout = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const callLogoutPage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/logout`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log("🚀 ~ file: Logout.jsx:9 ~ callLogoutPage ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: Logout.jsx:18 ~ callLogoutPage ~ data:", data);

      if (res) {
        dispatch({ type: "USER", payload: false });
      }
      if (res.status === 200) {
        Notify("logout successful", "success");
      }
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ file: Logout.jsx:9 ~ callLogoutPage ~ error:", error);
    }
  };
  useEffect(() => {
    callLogoutPage();
  }, []);
  return (
    <div className="container mt-5 pt-5">
      <div className="logout text-center">
        <AtomicSpinner electronPathCount="29" nucleusSpeed="10" />
        <h1 className="logout-content">Wait, Logging out...</h1>
      </div>
    </div>
  );
};

export default Logout;
