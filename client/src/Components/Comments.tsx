import Comment from "./Comment";

export default function Comments() {
  return (
    <div className="post__comments">
      {/* Insert your comment */}
      <div className="your_comment">
        <img src={require("../images/profile pic.jpg")} alt="profile picture" />
        <input
          type="text"
          className="input"
          placeholder="Enter Your Comment..."
        />
      </div>
      <Comment />
      <Comment />
    </div>
  );
}
