import { useEffect, useState } from "react";
import Profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../CustomHook/globalContext";

const About = () => {
  const navigate = useNavigate();
  const { setProgress } = useGlobalContext();
  const [userInfo, setUserInfo] = useState({ _id: "", name: "", email: "", phone: "", profession: "", date: "" });
  const callAboutPage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/about`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      console.log("🚀 ~ file: About.jsx:15 ~ callAboutPage ~ res:", res);

      const data = await res.json();
      console.log("🚀 ~ file: About.jsx:18 ~ callAboutPage ~ data:", data);

      if (res.status !== 200) {
        navigate("/login");
      } else {
        setUserInfo((prev) => {
          return { ...prev, ...data.content };
        });
      }
    } catch (err) {
      console.log("🚀 ~ file: About.jsx:10 ~ callAboutPage ~ err:", err);
    }
  };

  // we can't define async callback function in the parameter of useEffect hook, but we can define an async function inside the callback function of useEffect hook
  useEffect(() => {
    setProgress(30);
    callAboutPage();
    const id = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className="container emp-profile pt-5">
      <form method="get">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img mx-auto text-center">
              <img src={Profile} alt="employee_photo" />
            </div>
          </div>
          <div className="col-md-6 order-3 order-md-2">
            <div className="profile-head">
              <h5 className="text-capitalize">{userInfo.name}</h5>
              <h6 className="text-capitalize">{userInfo.profession}</h6>
              <p className="profile-rating mt-3 mb-5">
                RANKING: <span>1 / 10</span>
              </p>
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    About
                  </button>

                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-target="#nav-profile"
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    aria-selected="false"
                    aria-controls="nav-profile"
                  >
                    Timeline
                  </button>
                </div>
              </nav>
            </div>
          </div>

          <div className="col-md-2 order-2 order-md-3 py-3 py-md-0 text-center">
            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 order-2 order-md-1">
            <div className="profile-work mx-md-auto pt-4 ps-5">
              <p>WORK LINK</p>
              <a href="#" target="_blank" rel="noreferrer">
                Youtube
              </a>
              <br />
              <a href="#" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <br />
              <a href="#" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <br />
              <a href="#" target="_blank" rel="noreferrer">
                Twitter
              </a>
              <br />
              <a href="#" target="_blank" rel="noreferrer">
                Github
              </a>
              <br />
              <a href="#" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="col-md-8 pt-3 order-1 order-md-2 about-info">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                <div className="row">
                  <div className="col-md-6">
                    <label>User ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userInfo._id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-capitalize">{userInfo.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userInfo.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userInfo.phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Profession</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-capitalize">{userInfo.profession}</p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>Entry Level</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Hourly Rate</label>
                  </div>
                  <div className="col-md-6">
                    <p>$10/hr</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Total Projects</label>
                  </div>
                  <div className="col-md-6">
                    <p>230</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>English Proficiency</label>
                  </div>
                  <div className="col-md-6">
                    <p>Fluent</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Availability</label>
                  </div>
                  <div className="col-md-6">
                    <p>6 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;
