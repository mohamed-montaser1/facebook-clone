import { useState } from "react";
import { Link } from "react-router-dom";
import Friends from "../images/friends";
import Avatar from "./Avatar";
import { useUser } from "../Context/User";
import { FaBell, FaChrome } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { useLogin } from "../Context/Login";
import { useSignup } from "../Context/Signup-VerifyAccount";

let activeColor = "#1876f2";

export default function Navbar(): JSX.Element {
  const { username } = useUser();
  const { setIsLoggedIn, setJwt, setIsSignedUp } = useLogin();
  const { setEmail, setPassword } = useSignup();
  let [showNotification, setShowNotification] = useState<boolean>(false);
  let [showOptions, setShowOptions] = useState<boolean>(false);
  let [showPages, setShowPages] = useState<boolean>(false);
  let [showLogoutChooses, setShowLogoutChooses] = useState<boolean>(false);
  const Logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setJwt("");
    setIsSignedUp(false);
    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 700);
  };

  const showLogoutChoosesHandler = () => setShowLogoutChooses(true);

  return (
    <>
      <nav className="header">
        <h1 className="logo">
          <Link to={"/"}>Mohamed</Link>
        </h1>
        <ul className="navigation-menu">
          <Link to={"/"}>
            <li className="navigation-menu__item rounded">
              <svg width="24" height="24">
                <polyline
                  points="2,12 12,2 22,12 22,22 14,22 14,15 10,15 10,22 2,22 2,11"
                  fill="none"
                  stroke={activeColor}
                  strokeWidth="2"
                />
                <rect
                  x="19"
                  y="5"
                  fill={activeColor}
                  height={"5"}
                  width={"2"}
                />
              </svg>
            </li>
          </Link>
          <Link to={"/friends"}>
            <li className="navigation-menu__item rounded">
              <Friends />
            </li>
          </Link>
        </ul>
        <div className="info">
          <Link to={"/me"}>
            <div className="me">
              <Avatar
                src={require("../images/profile pic.png")}
                width={"30"}
                height={"30"}
                className="rounded-circle"
              />
              <p>{username}</p>
            </div>
          </Link>
          <FaBell onClick={() => setShowNotification((prev) => !prev)} />
          <AiOutlineCaretDown onClick={() => setShowOptions((prev) => !prev)} />
          <FaChrome
            className="chrome"
            onClick={() => setShowPages((prev) => !prev)}
          />
        </div>
      </nav>
      <div
        className={`notification-container ${showNotification ? "show" : ""}`}
      >
        <h2>Notifications</h2>
        <p>No Notifications Right Now</p>
      </div>
      <div className={`menu-container ${showOptions ? "show" : ""}`}>
        <Link to={"/me"}>
          <div className="profile-info">
            <Avatar
              src={require("../images/profile pic.png")}
              width={"60"}
              height={"60"}
              className="rounded-circle"
            />
            <div className="text">
              <h3>{username}</h3>
              <p>See Your Profile</p>
            </div>
          </div>
        </Link>
        <ul className="menu-options">
          <li>
            <BsFillGearFill className="icon" />
            <p>Settings</p>
          </li>
          <li onClick={showLogoutChoosesHandler}>
            <BiExit className="icon" />
            <p>Logout</p>
          </li>
        </ul>
      </div>
      <div className={`all-pages ${showPages ? "show" : ""}`}></div>
      <div className={`logout-overlay ${showLogoutChooses ? "show" : ""}`}>
        <div className="logout-sure">
          <h2>Are You Sure You Want To Logout ?</h2>
          <div className="buttons-container">
            <button className="yes" onClick={Logout}>
              Yes
            </button>
            <button className="no" onClick={() => setShowLogoutChooses(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
