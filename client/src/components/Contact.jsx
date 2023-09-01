import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "../Notification/toastify";
import useGlobalContext from "../CustomHook/globalContext";

const Contact = () => {
  const navigate = useNavigate();
  const { setProgress } = useGlobalContext();
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const callContactPage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/getData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      console.log("🚀 ~ file: Contact.jsx:15 ~ callContactPage ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: Contact.jsx:18 ~ callContactPage ~ data:", data);

      if (res.status !== 200) {
        return navigate("/login");
      } else {
        setUserInfo((prev) => {
          return { ...prev, ...data.content };
        });
      }
    } catch (err) {
      console.log("🚀 ~ file: About.jsx:10 ~ callAboutPage ~ err:", err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const sendMsg = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${import.meta.env.VITE_SERVER}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...userInfo }),
      });
      console.log("🚀 ~ file: Contact.jsx:54 ~ sendMsg ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: Contact.jsx:57 ~ sendMsg ~ data:", data);

      if (res.status !== 201) {
        if (data) {
          Notify(data.error, "error");
        } else {
          Notify("message not sent!", "error");
        }
      } else {
        Notify(data.message, "success");
        setUserInfo((prev) => {
          return { ...prev, message: "" };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProgress(30);
    callContactPage();
    const id = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className="contact-info">
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-lg-10 d-flex flex-wrap mx-auto">
              <div className="contact-info-item py-3 px-1 px-lg-5">
                <span>
                  <i className="zmdi zmdi-phone-msg"></i>
                </span>
                <div className="contact-info-content">
                  <div className="contact-info-title">Phone</div>
                  <div className="contact-info-text">+91 1111 543 2198</div>
                </div>
              </div>
              <div className="contact-info-item py-3 px-1 px-lg-5">
                <span>
                  <i className="zmdi zmdi-email"></i>
                </span>
                <div className="contact-info-content">
                  <div className="contact-info-title">Email</div>
                  <div className="contact-info-text">contact@dev.com</div>
                </div>
              </div>
              <div className="contact-info-item py-3 px-1 px-lg-5">
                <span>
                  <i className="zmdi zmdi-google-maps"></i>
                </span>
                <div className="contact-info-content">
                  <div className="contact-info-title">Address</div>
                  <div className="contact-info-text">New Delhi,India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="contact-form-container py-3 px-3 px-lg-5">
                  <div className="contact-form-title">Get in Touch</div>
                  <form id="contact-form" className="mt-4" method="post">
                    <div className="contact-form-profile d-flex flex-wrap justify-content-between align-items-center">
                      <input
                        type="text"
                        className="input-field"
                        id="contact-form-name"
                        placeholder="Your Name"
                        required
                        autoComplete="off"
                        name="name"
                        value={userInfo.name}
                        disabled
                      />
                      <input
                        type="email"
                        className="input-field"
                        id="contact-form-email"
                        placeholder="Your Email"
                        required
                        autoComplete="off"
                        name="email"
                        value={userInfo.email}
                        disabled
                      />
                      <input
                        type="text"
                        className="input-field"
                        id="contact-form-number"
                        placeholder="Your Phone No."
                        minLength="10"
                        maxLength="10"
                        required
                        name="phone"
                        autoComplete="off"
                        value={userInfo.phone}
                        disabled
                      />
                    </div>

                    <div className="contact-form-msg mt-4">
                      <textarea
                        className="text-field"
                        placeholder="Message"
                        name="message"
                        value={userInfo.message}
                        autoComplete="off"
                        onChange={handleInput}
                      ></textarea>
                    </div>

                    <div className="contact-form-button mt-4">
                      <button type="submit" className="button contact-submit-button" onClick={sendMsg}>
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
