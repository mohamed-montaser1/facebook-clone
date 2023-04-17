import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { postType, postsType } from "../../types/mainTypes";
import { useLogin } from "../Context/Login";
import api_key from "../Services/Api_Url";
import Modal from "./Modal";
import Avatar from "./Avatar";
import { useUser } from "../Context/User";
import { Link, Navigate } from "react-router-dom";
import { BiComment, BiLike } from "react-icons/bi";
import Reaction from "./React";

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
  care,
  sad,
  updatedAt,
  wow,
  image,
}: postType) {
  const { id } = useUser();
  const { username, avatar } = useUser();
  let inputRef = useRef(null);
  let [comments, setComments] =
    useState<
      Array<{ username: string; user_avatar: string; user_comment: string }>
    >(comments_content);
  let [comments_number, setComments_number] = useState<number>(comments_count);
  let [showComments, setShowComments] = useState<boolean>(false);
  // useEffect(() => {
  //   async function getUserAvatar() {}
  //   getUserAvatar();
  // }, []);

  const HandleLike = () => {};
  const HandleLove = () => {};
  const HandleCare = () => {};
  const HandleLol = () => {};
  const HandleWow = () => {};
  const HandleSad = () => {};
  const HandleAngry = () => {};

  const handleAddComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current.value.trim() !== "") {
        await axios.post(`${api_key}/posts/add-comment/${_id}`, {
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
        setComments_number((prev) => prev + 1);
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="post">
        <div className="content-container">
          <div className="post-header">
            <Avatar
              src={require("../images/profile pic.png")}
              width={40}
              height={40}
              className="rounded-circle"
            />
            <div className="author_info">
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
          <div className="post-content">
            <p>{content}</p>
            {image !== "" ? (
              <Link to={`/post/${_id}`}>
                <img
                  src={image}
                  className="mb-5 post-image"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    maxHeight: "1560px",
                    overflow: "hidden",
                  }}
                  alt=""
                />
              </Link>
            ) : (
              ""
            )}
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
                  likes.count,
                  loves.count,
                  haha.count,
                  care.count,
                  wow.count,
                  sad.count,
                  angry.count,
                ].reduce((acc, curr) => acc + curr)}
              </p>
            </div>
            <p
              className="comments-count"
              onClick={() => setShowComments((prev) => !prev)}
            >
              {comments_number} comment{comments_number > 1 ? "s" : ""}
            </p>
          </div>
          <div className="like-comment">
            <button className="like">
              <BiLike /> Like
            </button>
            <button onClick={() => setShowComments((prev) => !prev)}>
              <BiComment /> Comment
            </button>
            <div className={`reacts`}>
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
                    key={Math.floor(Math.random() * 1000000)}
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
    </>
  );
}
