import axios from "axios";
import React, { useEffect, useRef, useState, useReducer } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import api_key from "../Services/Api_Url";
import Avatar from "../Components/Avatar";
import { useUser } from "../Context/User";
import { FaBell, FaChrome } from "react-icons/fa";
import { AiFillLike, AiOutlineCaretDown } from "react-icons/ai";
import { useSignup } from "../Context/Signup-VerifyAccount";
import { useLogin } from "../Context/Login";
import { BsFillGearFill } from "react-icons/bs";
import { BiComment, BiExit, BiLike } from "react-icons/bi";
import Reaction from "../Components/React";
import { ActionType, initialValue, reducer } from "../Reducer/useReducer";
import Alert from "../Components/Alert";

type Reach = {
  count: number;
  users: Array<{
    username: string;
    user_avatar: string;
  }>;
};

type ReachObject = {
  likes: Reach;
  loves: Reach;
  care: Reach;
  haha: Reach;
  wow: Reach;
  sad: Reach;
  angry: Reach;
};

type comment = { username: string; user_avatar: string; user_comment: string };

export default function Post() {
  const { postId, userId } = useParams();
  const [image, setImage] = useState<string>("");

  const { username, avatar, email } = useUser();
  let [showNotification, setShowNotification] = useState<boolean>(false);
  let [showOptions, setShowOptions] = useState<boolean>(false);
  let [showPages, setShowPages] = useState<boolean>(false);
  let [showLogoutChooses, setShowLogoutChooses] = useState<boolean>(false);
  let [author_name, setAuthor_name] = useState<string>("");
  let [updatedAt, setUpdatedAt] = useState<string>("");
  let [likes, setLikes] = useState<Array<{ _id: string }>>([]);
  let [id, setId] = useState<string>("");
  const { setEmail, setPassword } = useSignup();
  const { setIsLoggedIn, setJwt, setIsSignedUp } = useLogin();

  let [comments, setComments] = useState<Array<comment>>([]);
  let [comments_count, setComments_count] = useState<number>(0);
  let [showComments, setShowComments] = useState<boolean>(false);
  let [state, dispatch] = useReducer(reducer, initialValue);
  let [isLiked, setIsLiked] = useState<boolean>(false);
  let [content, setContent] = useState<string>("");
  let inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenPost = async () => {
      // console.log(
      //   `api key is ${api_key}, post id is ${postId}, user id is ${userId}`
      // );

      var res = await axios.get(
        `${api_key}/posts/open-post/${postId}/${userId}`
      );
      if (res.data.success === false) {
        location.href = location.origin + "/error";
      } else {
        setImage(res.data.image);
        setAuthor_name(res.data.author_name);
        setUpdatedAt(res.data.updatedAt);
        setComments(res.data.comments_content);
        setId(res.data._id);
        setLikes(res.data.reactions.likes);
        setComments_count(res.data.comments_count);
        setContent(res.data.content);
        setIsLiked(res.data.isCurrentUserLike);
      }

      // if (res.data.reactions.likes.includes(userId)) {

      // }
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

        setComments_count((prev) => prev + 1);

        inputRef.current.value = "";
      }
    }
  };
  const handleAddLike = async () => {
    dispatch({
      type: ActionType.LIKE,
      payload: {
        likes,
        setLikes,
        isLiked,
        setIsLiked,
      },
      postId: id,
      userId: userId,
    });
  };
  const handleUnLike = async () => {
    dispatch({
      type: ActionType.UNLIKE,
      payload: {
        likes,
        setLikes,
        isLiked,
        setIsLiked,
      },
      postId: id,
      userId: userId,
    });
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
                  day: "numeric",
                })}{" "}
                {new Date(updatedAt).toLocaleString("default", {
                  month: "long",
                })}
                {"   "}
                {new Date(updatedAt).getFullYear()}
              </p>
            </div>
          </div>
          <div className="post-content">
            <p>{content}</p>
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
               <p className="reach-count">{likes.length}</p>
            </div>
            <p
              className="comments-count"
              onClick={() => setShowComments((prev) => !prev)}
            >
              {comments_count} comment{comments_count > 1 ? "s" : ""}
            </p>
          </div>
          <div className="like-comment">
            {isLiked ? (
              <button className="like" onClick={handleUnLike}>
                <AiFillLike color="#1876f2" />{" "}
                <span style={{ color: "#1876f2" }}>Like</span>
              </button>
            ) : (
              <button className="like" onClick={handleAddLike}>
                <BiLike /> Like
              </button>
            )}
            <button onClick={() => setShowComments((prev) => !prev)}>
              <BiComment /> Comment
            </button>
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
              {comments.reverse().map((comment) => {
                return (
                  <div className="comment-container" key={Math.floor(Math.random() * 1000000000000)}>
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
                    <svg width={"30"} height={"10"}>
                      <circle
                        fill="#fff"
                        width={"10"}
                        height={"10"}
                        r={"4"}
                        cx={"5"}
                        cy={"5"}
                      />
                      <circle
                        fill="#fff"
                        width={"10"}
                        height={"10"}
                        r={"4"}
                        cx={"15"}
                        cy={"5"}
                      />
                      <circle
                        fill="#fff"
                        width={"10"}
                        height={"10"}
                        r={"4"}
                        cx={"25"}
                        cy={"5"}
                      />
                    </svg>
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
