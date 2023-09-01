// import React from 'react'
import { useEffect, useState } from "react";
import useGlobalContext from "../CustomHook/globalContext";

const Home = () => {
  const { setProgress } = useGlobalContext();
  const [userName, setUserName] = useState({ name: "" });

  const callHomePage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/getData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      console.log("🚀 ~ file: Home.jsx:16 ~ callHomePage ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: Home.jsx:19 ~ callHomePage ~ data:", data);

      if (res.status === 200) {
        setUserName((prev) => {
          return { ...prev, name: data.content.name };
        });
      }
    } catch (err) {
      console.log("🚀 ~ file: Home.jsx:30 ~ callHomePage ~ err:", err);
    }
  };

  useEffect(() => {
    setProgress(30);
    callHomePage();
    const id = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          {userName.name ? <h1 className="px-2 px-md-0 username">{userName.name}</h1> : null}
          <h1 className="px-2 px-md-0">{userName.name ? "Happy to see you!" : "We Are The MERN Developer"}</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
