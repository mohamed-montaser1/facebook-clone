import axios from "axios";
import { useState, useContext, createContext, FC, useEffect } from "react";
import {
  loginProvider,
  loginType,
  postContextType,
  postsType,
  UserContextType,
} from "../../types/mainTypes";
import api_key from "../Services/Api_Url";
import { useLogin } from "./Login";

const userContext = createContext<Partial<UserContextType>>({});

const userProvider: FC<loginProvider> = ({ children }): JSX.Element => {
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { jwt } = useLogin();

  let config = {
    headers: {
      authorization: jwt,
    },
  };
  const getUserData = async () => {
    let res = await axios.get(`${api_key}/auth/me`, config);
    let data: {
      avatar: string;
      email: string;
      id: string;
      username: string;
    } = res.data.data;

    setAvatar(data.avatar);
    setEmail(data.email);
    setId(data.id);
    setUsername(data.username);
  };

  const userValue = {
    getUserData,
    avatar,
    setAvatar,
    email,
    setEmail,
    id,
    setId,
    username,
    setUsername,
  };

  return (
    <>
      <userContext.Provider value={userValue}>{children}</userContext.Provider>
    </>
  );
};

export const useUser = () => useContext(userContext);

export default userProvider;
