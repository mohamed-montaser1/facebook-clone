import Avatar from "./Avatar";

export default function Comment({ username, user_comment }) {
  return (
    <div className="comment">
      <Avatar src="../images/profile pic.png" width={24} height={24} />
      <div className="comment__content">
        <h4 className="author-name">{username}</h4>
        <p className="comment-content">{user_comment}</p>
      </div>
    </div>
  );
}
