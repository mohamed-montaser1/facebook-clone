import axios from "axios";
import React, { useRef, useState } from "react";
import api_key from "../Services/Api_Url";
import { useUser } from "../Context/User";
import { setBoolean } from "../../types/mainTypes";

interface Props {
  setShowModal: setBoolean;
  className: string;
}

export default function Modal({ setShowModal, className }: Props) {
  let [imageUrl, setImageUrl] = useState<string>("");
  let [isLoading, setIsLoading] = useState<boolean>(false);

  let textareaRef = useRef<HTMLTextAreaElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { username, avatar, id } = useUser();
  let [valid, setValid] = useState({
    textArea: false,
    image: false,
  });

  const createNewPost = async () => {
    let value =
      textareaRef.current.value !== "" ? textareaRef.current.value : "";
    let body = {
      data: {
        author_name: username,
        author_avatar: avatar,
        content: value,
        image: imageUrl,
        author_id: id,
      },
    };
    const res = await axios.post(`${api_key}/posts/create`, body);

    if (res.data.message === "Created Successfuly") {
      closeRef.current.click();
      window.location.href = window.location.origin;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0) {
      setValid({ image: valid.image, textArea: false });
    } else {
      setValid({ image: valid.image, textArea: true });
    }
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const file = event.target.files[0];
    const imgUrl = await uploadImage(file);
    setImageUrl(imgUrl);
    setIsLoading(false);
    setValid({ textArea: valid.textArea, image: true });
  };
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${api_key}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.url;
    } catch (error) {
      console.error(error);
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
        <div className={`img-container ${isLoading ? "image-loading" : ""}`}>
          {imageUrl !== "" ? (
            <>
              <img src={imageUrl} />
              <button className="delete-img" onClick={() => setImageUrl("")}>
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
            </>
          ) : (
            ""
          )}
          {isLoading ? <h1>Loading...</h1> : ""}
        </div>
        <div className="options">
          <p>Add To Your Post: </p>
          <label htmlFor="upload-img" className="upload-img">
            <span className="icon"></span>{" "}
            <span className="content">Photo</span>
          </label>
          <input
            type="file"
            id="upload-img"
            className="d-none"
            onChange={handleUploadImage}
            accept=".jpg,.png"
          />
        </div>
        <button
          className={`post-button ${
            !valid.image && !valid.textArea ? "disabled" : ""
          }`}
          onClick={createNewPost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
