import { NavLink, useNavigate } from "react-router-dom";
import SignIn from "../assets/login.png";
import { useState, useRef, useEffect } from "react";
import useGlobalContext from "../CustomHook/globalContext";
import { Notify } from "../Notification/toastify";

const Login = () => {
  const { dispatch, setProgress } = useGlobalContext();
  const toggleVisibility = useRef(null);
  const [visible, setVisible] = useState(false);
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${import.meta.env.VITE_SERVER}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...credential }),
      });
      console.log("🚀 ~ file: Login.jsx:27 ~ loginUser ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: Login.jsx:30 ~ loginUser ~ data:", data);

      if (res.status === 500 || !res) {
        Notify("server error", "error");
      } else if (res.status === 400) {
        Notify(data.error, "error");
      } else {
        Notify(data.message, "success");
        dispatch({ type: "USER", payload: true });
        navigate("/");
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.jsx:21 ~ loginUser ~ error:", error);
    }
  };

  const changePrivacy = () => {
    toggleVisibility.current.type = toggleVisibility.current.type === "password" ? "text" : "password";
    setVisible((status) => !status);
  };

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
    <section className="signin pt-5">
      <div className="container mt-5">
        <div className="signin-content py-5 px-1 px-lg-5">
          <div className="signin-image">
            <figure className="pb-5">
              <img src={SignIn} alt="login" />
            </figure>
            <NavLink to="/signup" className="signin-image-link">
              Create an Account
            </NavLink>
          </div>

          <div className="signin-form py-md-3 px-md-5">
            <h2 className="form-title mb-3">Sign in</h2>
            <form className="login-form" id="login-form" method="post">
              <div className="input-group mb-3">
                <span className="input-group-text" id="email">
                  <i className="zmdi zmdi-email"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={credential.email}
                  placeholder="Your Email"
                  aria-label="Your Email"
                  aria-describedby="email"
                  required
                  autoComplete="off"
                  onChange={handleInput}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="password">
                  <i className="zmdi zmdi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={credential.password}
                  placeholder="Your Password"
                  aria-label="Your Password"
                  aria-describedby="password"
                  required
                  autoComplete="off"
                  ref={toggleVisibility}
                  onChange={handleInput}
                />
                <span className="input-group-text" onClick={changePrivacy}>
                  <i className={visible ? "zmdi zmdi-eye" : "zmdi zmdi-eye-off"}></i>
                </span>
              </div>
              <div className="mb-3">
                <input type="submit" name="signin" id="signin" className="form-submit px-3 py-1" value="Login" onClick={loginUser} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
