import { NavLink, useNavigate } from "react-router-dom";
import SignUp from "../assets/signup.png";
import { useRef, useState, useEffect } from "react";
import { Notify } from "../Notification/toastify";
import useGlobalContext from "../CustomHook/globalContext";

const Signup = () => {
  const { setProgress } = useGlobalContext();
  const toggleVisibility = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", phone: "", profession: "", password: "", confirm_password: "" });
  const [visible, setVisible] = useState(false);

  const changePrivacy = () => {
    toggleVisibility.current.type = toggleVisibility.current.type === "password" ? "text" : "password";
    setVisible((status) => !status);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${import.meta.env.VITE_SERVER}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });
      console.log("🚀 ~ file: Signup.jsx:33 ~ postData ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: Signup.jsx:36 ~ postData ~ data:", data);

      if (res.status === 500 || !res) {
        Notify("server error", "error");
      } else if (res.status === 422) {
        Notify(data.error, "error");
      } else {
        Notify(data.message, "success");
        navigate("/login");
      }
    } catch (err) {
      console.log("🚀 ~ file: Signup.jsx:50 ~ postData ~ err:", err);
    }
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
    <section className="signup">
      <div className="container mt-5">
        <div className="signup-content px-3 px-lg-5">
          <div className="signup-form py-md-3 px-md-5">
            <h2 className="form-title mb-3">Sign up</h2>
            <form className="register-form" id="register-form" method="post">
              <div className="input-group mb-3">
                <span className="input-group-text" id="name">
                  <i className="zmdi zmdi-account"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  aria-label="Your Name"
                  aria-describedby="name"
                  required
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="email">
                  <i className="zmdi zmdi-email"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Your Email"
                  aria-label="Your Email"
                  aria-describedby="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="phone">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Your Phone No."
                  aria-label="Your Phone No."
                  aria-describedby="phone"
                  minLength="10"
                  maxLength="10"
                  required
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="profession">
                  <i className="zmdi zmdi-slideshow"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="profession"
                  placeholder="Your Profession"
                  aria-label="Your Profession"
                  aria-describedby="profession"
                  required
                  autoComplete="off"
                  value={user.profession}
                  onChange={handleInputs}
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
                  placeholder="Your Password"
                  aria-label="Your Password"
                  aria-describedby="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                  ref={toggleVisibility}
                />
                <span className="input-group-text" onClick={changePrivacy}>
                  <i className={visible ? "zmdi zmdi-eye" : "zmdi zmdi-eye-off"}></i>
                </span>
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text" id="confirm_password">
                  <i className="zmdi zmdi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  placeholder="Confirm Your Password"
                  aria-label="Confirm Your Password"
                  aria-describedby="confirm_password"
                  required
                  autoComplete="off"
                  value={user.confirm_password}
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <input type="submit" name="signup" id="signup" className="form-submit px-3 py-1" value="Register" onClick={postData} />
              </div>
            </form>
          </div>

          <div className="signup-image">
            <figure className="pb-5">
              <img src={SignUp} alt="register" />
            </figure>
            <NavLink to="/login" className="signup-image-link">
              Already registered?
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
