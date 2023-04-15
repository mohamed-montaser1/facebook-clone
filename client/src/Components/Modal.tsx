import axios from "axios";
import React, { useRef } from "react";
import api_key from "../Services/Api_Url";
import { useUser } from "../Context/User";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

export default function Modal({ setShowModal, className }: Props) {
  let textareaRef = useRef<HTMLTextAreaElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const { username, avatar, id } = useUser();

  const createNewPost = async () => {
    let body = {
      data: {
        author_name: username,
        author_avatar: avatar,
        content: textareaRef.current.value,
        author_id: id,
      },
    };
    const res = await axios.post(`${api_key}/posts/create`, body);
    if (res.data.message === "Created Successfuly") {
      // setReRender(true);
      closeRef.current.click();
      window.location.href = window.location.origin;
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
    <div className={`newpost-modal-container ${className}`}>
      <div className="newpost-modal">
        <div className="newpost-modal__header">
          <h3>Create Post</h3>
          <button
            className="close"
            ref={closeRef}
            onClick={() => setShowModal(false)}
          >
            <svg width={"30"} height={"30"}>
              <line
                x1={10}
                y1={10}
                x2={20}
                y2={20}
                stroke="#fff"
                strokeWidth={2}
              />
              <line
                x1={20}
                y1={10}
                x2={10}
                y2={20}
                stroke="#fff"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>
        <div className="user-info">
          <img src={require("../images/profile pic.png")} alt="" />
          <h4>{username}</h4>
        </div>
        <textarea
          className="textarea"
          placeholder={`What's on your mind, ${username} ?`}
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
