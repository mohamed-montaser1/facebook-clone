import React, { useState, useEffect, useContext, createContext } from "react";
import {
  PostContextType,
  providerType,
  setString,
} from "../../types/mainTypes";
import api_key from "../Services/Api_Url";
import { useLogin } from "./Login";

const postContext = createContext<Partial<PostContextType>>({});

interface postValue {
  author_name: string;
  setAuthor_name: setString;
}

export default function PostProvider({ children }: providerType) {
  let [author_name, setAuthor_name] = useState<string>("");

  async function getPostData() {}

  useEffect(() => {
    getPostData();
  }, []);

  const postValue: postValue = { author_name, setAuthor_name };

  return (
    <>
      <postContext.Provider value={postValue}>{children}</postContext.Provider>
    </>
  );
}

export const usePost = () => useContext(postContext);
