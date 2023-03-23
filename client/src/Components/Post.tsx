import { useState } from "react";
import { BiShare } from "react-icons/bi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdInsertComment, MdOutlineComment } from "react-icons/md";
import Comments from "./Comments";
import moment from "moment";

interface Props {
  _id: string;
  username: string;
  createdAt?: Date;
  content: string;
  comments: number;
  likes: number;
  date: any;
}

export default function Post({
  _id,
  username,
  content,
  comments,
  likes,
  date,
}: Props) {
  let [show, setShow] = useState<boolean>(true);
  let [isLiked, setIsLiked] = useState<boolean>(false);
  let date1 = moment(date, "YYYY-MM-DD").fromNow();
  return (
    <>
      <div className="post">
        <div className="post__header">
          <div className="author">
            <img
              src={require("../images/profile pic.jpg")}
              alt="profile picture"
            />
            <div className="author__info">
              <h4>{username}</h4>
              <small>{date1}</small>
            </div>
          </div>
        </div>
        <p className="post__content">{content}</p>
        <div className="post__controllers container">
          <div className="row">
            <div className="col-sm-4">
              <button
                className="like"
                onClick={() => setIsLiked((prev) => !prev)}
              >
                {isLiked ? <AiFillLike /> : <AiOutlineLike />} like
              </button>
            </div>
            <div className="col-sm-4">
              <button
                className="comment"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? <MdInsertComment /> : <MdOutlineComment />} comment
              </button>
            </div>
            <div className="col-sm-4">
              <button className="like">
                <BiShare /> share
              </button>
            </div>
          </div>
        </div>
        {show ? <Comments post_id={_id} /> : ""}
      </div>
    </>
  );
}
