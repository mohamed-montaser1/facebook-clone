import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { comments } from "../../types/mainTypes";
import { useLogin } from "../Context/Login";
import { useUser } from "../Context/User";
import api_key from "../Services/Api_Url";
import Comment from "./Comment";

export default function Comments({ post_id }) {
  const [comments, setComments] = useState<comments>([]);
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const commentInputRef = useRef<HTMLInputElement>(null);

  const { jwt } = useLogin();
  let config = {
    headers: {
      authorization: jwt,
    },
  };

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`${api_key}/posts/get-one/${post_id}`);
      let comments = res.data.comments_content;
      setComments(comments);
      console.log(res, comments);
    };
    getData();

    const getUserData = async () => {
      let res = await axios.get(`${api_key}/auth/me`, config);
      let data: {
        avatar: string;
        email: string;
        id: string;
        username: string;
      } = res.data.data;

      setUsername(data.username);
      setAvatar(data.avatar);
    };
    getUserData();
  }, []);

  const HandleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    let config = {
      headers: {
        authorization: jwt,
      },
    };
    let body = {
      data: {
        username,
        user_avatar: avatar,
        user_comment: commentInputRef.current.value,
      },
    };
    const res = await axios.post(
      `${api_key}/posts/add-comment/${post_id}`,
      body,
      config
    );
  };

  return (
    <div className="post__comments">
      {/* Insert your comment */}
      <div className="your_comment">
        <img src={require("../images/profile pic.jpg")} alt="profile picture" />
        <input
          type="text"
          className="input"
          placeholder="Enter Your Comment..."
          onKeyUp={(e) => (e.code == "Enter" ? HandleSubmit(e) : "")}
          ref={commentInputRef}
        />
      </div>
      {comments.map((comment) => {
        return (
          <Comment
            username={comment.username}
            user_comment={comment.user_comment}
          />
        );
      })}
    </div>
  );
}
