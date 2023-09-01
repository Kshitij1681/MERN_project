// import React from "react";
import { NavLink } from "react-router-dom";
import RenderMenu from "./RenderMenu";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-lg">
      <div className="container-fluid py-2">
        <NavLink className="navbar-brand text-light ps-lg-4" to="/">
          <div className="logo mx-3"></div>
          MERN DEV
        </NavLink>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ fontSize: "50%" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
