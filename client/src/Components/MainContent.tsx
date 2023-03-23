import axios from "axios";
import { useEffect, useState } from "react";
import { postsType } from "../../types/mainTypes";
import api_key from "../Services/Api_Url";
import Post from "./Post";

export default function MainContent() {
  let [posts, setPosts] = useState<postsType>([]);

  useEffect(() => {
    const getPosts = async () => {
      let res = await axios.get(`${api_key}/posts`);
      let allPosts = res.data.allPosts;
      setPosts(allPosts);
    };
    getPosts();
  }, [posts]);

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
              <button>What's on your mind, Mohamed?</button>
            </div>
          </div>
          {posts.map((post, index) => {
            return (
              <Post
                key={post._id}
                username={post.author_name}
                content={post.content}
                comments={post.comments_count}
                likes={post.likes_count}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
