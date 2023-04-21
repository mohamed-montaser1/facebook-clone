import axios from "axios";
import api_key from "../Services/Api_Url";
import React from "react";
import { setBoolean } from "../../types/mainTypes";

type state = {
  liked: boolean;
};
export enum ActionType {
  LIKE = "LIKE",
  UNLIKE = "UNLIKE",
}

type payload = {
  likes: Array<{ _id: string }>;
  setLikes: React.Dispatch<React.SetStateAction<Array<{ _id: string }>>>;
  isLiked: boolean;
  setIsLiked: setBoolean;
};

type action = {
  type: ActionType;
  payload: payload;
  postId: string;
  userId: string;
};

export const reducer = (state: state, action: action) => {
  const { type, payload, postId, userId } = action;
  const { LIKE, UNLIKE } = ActionType;
  switch (type) {
    case LIKE:
      HandleUserLike(payload, postId, userId);
      break;
    case UNLIKE:
      HandleUserUnLike(payload, postId, userId);
      break;
    default:
      return state;
  }
};

export const initialValue: state = { liked: false };

async function HandleUserLike(
  payload: payload,
  postId: string,
  userId: string
) {
  const { isLiked, likes, setIsLiked, setLikes } = payload;

  let res = await axios.post(`${api_key}/posts/add-like/${postId}/${userId}`);

  if (!res.data.success) {
    console.log(res)
  } else {
    setIsLiked(true)
    setLikes(res.data.likes)
  }
}

async function HandleUserUnLike(
  payload: payload,
  postId: string,
  userId: string
) {
 const { isLiked, likes, setIsLiked, setLikes } = payload;

  let res = await axios.post(`${api_key}/posts/remove-like/${postId}/${userId}`);

  if (!res.data.success) {
    console.log(res)
  } else {
    setIsLiked(false)
    setLikes(res.data.likes)
  }
}
