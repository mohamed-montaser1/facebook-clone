import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api_key from "../Services/Api_Url";
import Avatar from "../Components/Avatar";
import { useUser } from "../Context/User";
import { FaBell, FaChrome } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useSignup } from "../Context/Signup-VerifyAccount";
import { useLogin } from "../Context/Login";
import { BsFillGearFill } from "react-icons/bs";
import { BiComment, BiExit, BiLike } from "react-icons/bi";
import Reaction from "../Components/React";

type ReachObject = {
  likes: number;
  loves: number;
  care: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
};

export default function Post() {
  const { postId } = useParams();
  const [image, setImage] = useState<string>("");

  const { username, avatar, email } = useUser();
  let [showNotification, setShowNotification] = useState<boolean>(false);
  let [showOptions, setShowOptions] = useState<boolean>(false);
  let [showPages, setShowPages] = useState<boolean>(false);
  let [showLogoutChooses, setShowLogoutChooses] = useState<boolean>(false);
  let [author_name, setAuthor_name] = useState<string>("");
  let [updatedAt, setUpdatedAt] = useState<string>("");
  let [reach, setReach] = useState<ReachObject>();
  let [id, setId] = useState<string>("");
  const { setEmail, setPassword } = useSignup();
  const { setIsLoggedIn, setJwt, setIsSignedUp } = useLogin();

  let [comments, setComments] = useState<
    Array<{ username: string; user_avatar: string; user_comment: string }>
  >([]);
  let [comments_count, setComments_count] = useState<number>(0);
  let [showComments, setShowComments] = useState<boolean>(false);
  let [showReacts, setShowReacts] = useState<boolean>(false);

  let inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenPost = async () => {
      const res = await axios.get(`${api_key}/posts/open-post/${postId}`);
      // console.log(res);
      setImage(res.data.image);
      setAuthor_name(res.data.author_name);
      setUpdatedAt(res.data.updatedAt);
      setReach(res.data.reactions);
      setComments(res.data.comments_content);
      setId(res.data._id);
      setComments_count(res.data.comments_count);
    };
    handleOpenPost();
  }, []);

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

  const HandleLike = async () =>
    await axios.post(`${api_key}/posts/add-react/likes/${id}`);
  const HandleLove = async () =>
    await axios.post(`${api_key}/posts/add-react/loves/${id}`);
  const HandleCare = async () =>
    await axios.post(`${api_key}/posts/add-react/care/${id}`);
  const HandleLol = async () =>
    await axios.post(`${api_key}/posts/add-react/haha/${id}`);
  const HandleWow = async () =>
    await axios.post(`${api_key}/posts/add-react/wow/${id}`);
  const HandleSad = () => {};
  const HandleAngry = () => {};

  const handleAddComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value.trim() !== "") {
        await axios.post(`${api_key}/posts/add-comment/${id}`, {
          data: {
            username: username,
            user_avatar: avatar,
            user_comment: String(inputRef.current.value),
          },
        });

        setComments([
          ...comments,
          {
            username: username,
            user_avatar: avatar,
            user_comment: String(inputRef.current.value),
          },
        ]);

        inputRef.current.value = "";
      }
    }
  };
  return (
    <>
      <div className="post-fluid">
        <div className="left-side">
          <img src={image} alt="post-image" />
          <button className="close" onClick={() => window.history.back()}>
            <svg width={"30"} height={"30"}>
              <line
                x1={10}
                y1={10}
                x2={20}
                y2={20}
                stroke="#B8BBBF"
                strokeWidth={2}
              />
              <line
                x1={20}
                y1={10}
                x2={10}
                y2={20}
                stroke="#B8BBBF"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>
        <div className="right-side">
          <header className="header">
            <div className="info">
              <Link to={"/me"}>
                <div className="me">
                  <Avatar
                    src={""}
                    width={"30"}
                    height={"30"}
                    className="rounded-circle"
                  />
                  <p>{username}</p>
                </div>
              </Link>
              <FaBell onClick={() => setShowNotification((prev) => !prev)} />
              <AiOutlineCaretDown
                onClick={() => setShowOptions((prev) => !prev)}
              />
              <FaChrome
                className="chrome"
                onClick={() => setShowPages((prev) => !prev)}
              />
            </div>
          </header>
          <div className="author_info">
            <Avatar
              src={require("../images/profile pic.png")}
              width={40}
              height={40}
              className="rounded-circle"
            />
            <div className="text">
              <h4>{author_name}</h4>
              <p>
                {new Date(updatedAt).toLocaleTimeString()} in{" "}
                {new Date(updatedAt).toLocaleString("default", {
                  month: "long",
                })}
                {"   "}
                {new Date(updatedAt).getFullYear()}
              </p>
            </div>
          </div>
          <div className="reach">
            <div className="likes">
              <div className="reach-imgs">
                <img
                  src={require("../images/love.png")}
                  className="reach-img"
                  alt="reach-img"
                />
                <img
                  src={require("../images/like.png")}
                  className="reach-img"
                  alt="reach-img"
                />
              </div>
              <p className="reach-count">
                {[
                  reach?.likes,
                  reach?.loves,
                  reach?.haha,
                  reach?.care,
                  reach?.wow,
                  reach?.sad,
                  reach?.angry,
                ].reduce((acc, curr) => acc + curr)}
              </p>
            </div>
            <p
              className="comments-count"
              onClick={() => setShowComments((prev) => !prev)}
            >
              {comments_count} comment{comments_count > 1 ? "s" : ""}
            </p>
          </div>
          <div className="like-comment">
            <button className="like" onMouseOver={() => setShowReacts(true)}>
              <BiLike /> Like
            </button>
            <button onClick={() => setShowComments((prev) => !prev)}>
              <BiComment /> Comment
            </button>
            <div className={`reacts ${showReacts ? "show" : ""}`}>
              <Reaction
                src={require("../images/like.png")}
                className="reaction"
                onClick={HandleLike}
              />
              <Reaction
                src={require("../images/love.png")}
                className="reaction"
                onClick={HandleLove}
              />
              <Reaction
                src={require("../images/care.png")}
                className="reaction"
                onClick={HandleCare}
              />
              <Reaction
                src={require("../images/haha.png")}
                className="reaction"
                onClick={HandleLol}
              />
              <Reaction
                src={require("../images/wow.png")}
                className="reaction"
                onClick={HandleWow}
              />
              <Reaction
                src={require("../images/sad.png")}
                className="reaction"
                onClick={HandleSad}
              />
              <Reaction
                src={require("../images/angry.png")}
                className="reaction"
                onClick={HandleAngry}
              />
            </div>
          </div>

          <div className={`comments-section ${showComments ? "show" : ""}`}>
            <div className="new-comment">
              <Avatar
                src={require("../images/profile pic.png")}
                width={32}
                height={32}
                className="rounded-circle"
              />
              <input
                type="text"
                placeholder="write a comment..."
                onKeyUp={handleAddComment}
                ref={inputRef}
              />
            </div>
            <div className="comments">
              {comments.map((comment) => {
                return (
                  <div
                    className="comment"
                    style={{ marginBottom: "20px" }}
                    key={Math.floor(Math.random() * 1000)}
                  >
                    <Avatar
                      src={""}
                      width={32}
                      height={32}
                      className="rounded-circle"
                    />
                    <div className="comment-content">
                      <h4>{comment.username}</h4>
                      <p>{comment.user_comment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
