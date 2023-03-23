import axios from "axios";
import React, { useEffect, useRef } from "react";
import api_key from "../Services/Api_Url";

export default function Modal({
  username,
  setShowModal,
  setReRender,
}) {
  let textareaRef = useRef<HTMLTextAreaElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const createNewPost = async () => {
    let body = {
      data: {
        author_name: "mohamed",
        author_avatar: "../images/profile pic.jpg",
        content: textareaRef.current.value,
      },
    };
    const res = await axios.post(`${api_key}/posts/create`, body);
    if (res.data.message === "Created Successfuly") {
      setReRender(true);
      closeRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0) {
      let button = document
        .querySelector(`.${e.target.parentElement.className}`)
        .querySelector(".post-button");
      button.classList.add("disabled");
    } else {
      let button = document
        .querySelector(`.${e.target.parentElement.className}`)
        .querySelector(".post-button");
      button.classList.remove("disabled");
    }
  };
  return (
    <div className="newpost-modal-container">
      <div className="newpost-modal">
        <div className="newpost-modal__header">
          <h3>Create Post</h3>
          <button
            className="close"
            ref={closeRef}
            onClick={() => setShowModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="user-info">
          <img src={require("../images/profile pic.jpg")} alt="" />
          <h4>{username}</h4>
        </div>
        <textarea
          className="textarea"
          placeholder="What's on your mind, Mohamed ?"
          ref={textareaRef}
          onChange={(e) => handleChange(e)}
          autoFocus
        ></textarea>
        <button className={`post-button disabled`} onClick={createNewPost}>
          Post
        </button>
      </div>
    </div>
  );
}
