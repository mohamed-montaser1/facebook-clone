export default function Comment({ username, user_comment }) {
  return (
    <div className="comment">
      <img src={require("../images/profile pic.jpg")} alt="profile picture" />
      <div className="comment__content">
        <h4 className="author-name">{username}</h4>
        <p className="comment-content">{user_comment}</p>
      </div>
    </div>
  );
}
