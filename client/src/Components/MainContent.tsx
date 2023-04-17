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
import Post from "./Post";

export default function MainContent() {
  let [isShowModal, setIsShowModal] = useState<boolean>(false);
  let [showReacts, setShowReacts] = useState<boolean>(false);
  let [posts, setPosts] = useState<Array<Partial<postType>>>([]);

  const { username } = useUser();
  const showModal = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    async function getAllPosts() {
      let res = await axios.get(`${api_key}/posts`);
      setPosts(res.data.allPosts);
      console.log(res.data.allPosts);
    }
    getAllPosts();
  }, []);

  return (
    <>
      <div className="posts-container">
        <div className="create-new-post">
          <Link to={"/me"}>
            <Avatar
              src={require("../images/profile pic.png")}
              width={40}
              height={40}
              className="rounded-circle"
            />
          </Link>
          <p onClick={showModal} className="show-modal-p">
            What's on your mind, {username} ?
          </p>
          <Modal
            setShowModal={setIsShowModal}
            className={`${isShowModal ? "show" : ""}`}
          />
        </div>
        <div className="all-posts">
          {posts.map((post) => {
            return (
              <Post
                key={post._id}
                _id={post._id}
                likes={post.likes.}
                loves={post.loves}
                haha={post.haha}
                wow={post.wow}
                sad={post.sad}
                care={post.care}
                angry={post.angry}
                author_avatar={post.author_avatar}
                author_name={post.author_name}
                comments_content={post.comments_content}
                comments_count={post.comments_count}
                content={post.content}
                createdAt={post.createdAt}
                date={post.date}
                image={post.image}
                updatedAt={post.updatedAt}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
