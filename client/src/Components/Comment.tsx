export default function Comment() {
  return (
    <div className="comment">
      <img src={require("../images/profile pic.jpg")} alt="" />
      <div className="comment__content">
        <h4 className="author-name">mohamed montaser</h4>
        <p className="comment-content">
          hello my name is mohamed montaser and this is my comment about your
          post, your post is very good bro 👍, you can improve your skills with
          creating big projects like facebook-clone
        </p>
      </div>
    </div>
  );
}
