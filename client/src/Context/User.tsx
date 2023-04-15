import axios from "axios";
import React, { useState, useContext, createContext, useEffect } from "react";
import {
  providerType,
  setString,
  UserContextType,
} from "../../types/mainTypes";
import api_key from "../Services/Api_Url";
import { useLogin } from "./Login";

const userContext = createContext<Partial<UserContextType>>({});

interface userData {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

interface userValueType {
  username: string;
  setUsername: setString;
  email: string;
  setEmail: setString;
  avatar: string;
  setAvatar: setString;
  id: string;
}

export default function UserProvider({ children }: providerType) {
  const { jwt, isLoggedIn } = useLogin();
  let [username, setUsername] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [avatar, setAvatar] = useState<string>("");
  let [id, setId] = useState<string>("");
  let config = {
    headers: {
      authorization: jwt,
    },
  };

  async function getUserData() {
    const res = await axios.get(`${api_key}/auth/me`, config);
    let data: userData = res.data.data;
    setUsername(data.username);
    setEmail(data.email);
    setAvatar(data.avatar);
    setId(data.id);
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, []);

  const userValue: userValueType = {
    username,
    setUsername,
    email,
    setEmail,
    avatar,
    setAvatar,
    id,
  };

  return (
    <>
      <userContext.Provider value={userValue}>{children}</userContext.Provider>
    </>
  );
}

export const useUser = () => useContext(userContext);
