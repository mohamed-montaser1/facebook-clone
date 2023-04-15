import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { comments } from "../../types/mainTypes";
import { useLogin } from "../Context/Login";
import { useUser } from "../Context/User";
import api_key from "../Services/Api_Url";
import Comment from "./Comment";
import Avatar from "./Avatar";

export default function Comments({ post_id }) {
  const [comments, setComments] = useState<comments>([]);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { username, avatar } = useUser();
  const { jwt } = useLogin();

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`${api_key}/posts/get-one/${post_id}`);
      let comments = res.data.comments_content;
      setComments(comments);
    };
    getData();
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
      <div className="your_comment">
        <Avatar
          src={require(`../images/profile pic.png`)}
          width={32}
          height={""}
        />
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
