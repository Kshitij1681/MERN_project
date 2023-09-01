// import React from "react";
import { NavLink } from "react-router-dom";
import useGlobalContext from "../CustomHook/globalContext";
import { useEffect } from "react";

const Error = () => {
  const { setProgress } = useGlobalContext();

  useEffect(() => {
    setProgress(30);
    const id = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <div className="notfound-info">
            <h2>We are sorry, page not found!</h2>
            <p className="mb-5">The page you are looking for might have been removed or had it&apos;s name changed or is temporarily unavailable.</p>
            <NavLink to="/">
              <button>Back To Homepage</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
