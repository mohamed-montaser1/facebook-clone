import axios from "axios";
import { useEffect, useState } from "react";
import { postType, postsType } from "../../types/mainTypes";
import { useLogin } from "../Context/Login";
import api_key from "../Services/Api_Url";
import Modal from "./Modal";
import Avatar from "./Avatar";
import { useUser } from "../Context/User";
import { Link } from "react-router-dom";
import { BiComment, BiLike } from "react-icons/bi";
import Reaction from "./React";

interface Props {
  _id: string;
  username: string;
  createdAt?: Date;
  content: string;
  comments: number;
  likes: number;
  date: Date;
  userEmail: string;
}

interface userInfo {
  username: string;
  email: string;
}

export default function Post({
  _id,
  angry,
  author_avatar,
  author_name,
  comments_content,
  comments_count,
  content,
  createdAt,
  date,
  haha,
  likes,
  loves,
  sad,
  updatedAt,
  wow,
}: postType) {
  const [showReacts, setShowReacts] = useState<boolean>(false);

  const { username, email } = useUser();

  return (
    <>
      <div className="post">
        <div className="content-container">
          <div className="post-header">
            <Avatar
              src={require(author_avatar)}
              width={40}
              height={40}
              className="rounded-circle"
            />
            <div className="author_info">
              <h4>{author_name}</h4>
              <p>
                {new Date(updatedAt).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(updatedAt).getDay()},{" "}
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
                  alt=""
                />
                <img
                  src={require("../images/like.png")}
                  className="reach-img"
                  alt=""
                />
              </div>
              <p className="reach-count">
                {[likes, loves, haha, wow, sad, angry].reduce(
                  (acc, curr) => acc + curr
                )}
              </p>
            </div>
            <p className="comments-count">{comments_count} comment</p>
          </div>
          <div className="like-comment">
            <button
              onClick={() => setShowReacts(true)}
              onBlur={() => setShowReacts(false)}
              className="like"
            >
              <BiLike /> Like
            </button>
            <button>
              <BiComment /> Comment
            </button>
            <div className={`reacts ${showReacts ? "show" : ""}`}>
              <Reaction
                src={require("../images/like.png")}
                className="reaction"
              />
              <Reaction
                src={require("../images/love.png")}
                className="reaction"
              />
              <Reaction
                src={require("../images/haha.png")}
                className="reaction"
              />
              <Reaction
                src={require("../images/wow.png")}
                className="reaction"
              />
              <Reaction
                src={require("../images/sad.png")}
                className="reaction"
              />
              <Reaction
                src={require("../images/angry.png")}
                className="reaction"
              />
            </div>
          </div>
          <div className="comments-section">
            <div className="new-comment">
              <Avatar
                src={require("../images/profile pic.png")}
                width={32}
                height={32}
                className="rounded-circle"
              />
              <input type="text" placeholder="write a comment..." />
            </div>
            <div className="comments">
              <div className="comment">
                <Avatar
                  src={require("../images/profile pic.png")}
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
                {comments_content.map((comment) => {
                  return (
                    <div className="comment-content">
                      <h4>{comment.username}</h4>
                      <p>{comment.user_comment}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
