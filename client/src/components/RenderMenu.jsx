// import React from "react";
import { NavLink } from "react-router-dom";
import useGlobalContext from "../CustomHook/globalContext";

const RenderMenu = () => {
  const { state } = useGlobalContext();
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link text-light mx-lg-4" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-light mx-lg-4" to="/about">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link text-light mx-lg-4" to="/contact">
          Contact
        </NavLink>
      </li>
      {state ? (
        <li className="nav-item">
          <NavLink className="nav-link text-light mx-lg-4" to="/logout">
            Logout
          </NavLink>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <NavLink className="nav-link text-light mx-lg-4" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light mx-lg-4" to="/signup">
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default RenderMenu;
