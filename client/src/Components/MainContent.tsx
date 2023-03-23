import axios from "axios";
import { useEffect, useState } from "react";
import { postsType } from "../../types/mainTypes";
import { useLogin } from "../Context/Login";
import api_key from "../Services/Api_Url";
import Modal from "./Modal";
import Post from "./Post";

export default function MainContent() {
  let [posts, setPosts] = useState<postsType>([]);
  let [username, setUsername] = useState<string>();
  let [showModal, setShowModal] = useState<boolean>(false);
  let [reRender, setReRender] = useState<boolean>(false);

  const { jwt } = useLogin();

  useEffect(() => {
    const getPosts = async () => {
      let res = await axios.get(`${api_key}/posts`);
      let allPosts = res.data.allPosts;
      setPosts(allPosts);
    };
    getPosts();
  }, [reRender]);

  useEffect(() => {
    const getUsername = async () => {
      let config = {
        headers: {
          authorization: jwt,
        },
      };
      const res = await axios.get(`${api_key}/auth/me`, config);
      setUsername(res.data.data.username);
    };
    getUsername();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="content">
        <div className="post-container">
          <div className="create-post">
            <div className="create-post__header">
              <img
                src={require("../images/profile pic.jpg")}
                alt="profile image"
              />
              <button onClick={handleOpenModal}>
                What's on your mind, {username} ?
              </button>
            </div>
          </div>
          {posts.map((post) => {
            return (
              <Post
                key={post._id}
                _id={post._id}
                username={post.author_name}
                content={post.content}
                comments={post.comments_count}
                likes={post.likes_count}
                date={post.date}
              />
            );
          })}
        </div>
      </div>
      {showModal ? (
        <Modal
          username={"mohamed"}
          setShowModal={setShowModal}
          setReRender={setReRender}
        />
      ) : (
        ""
      )}
    </>
  );
}
