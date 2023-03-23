import axios from "axios";
import { useState, useContext, createContext, FC, useEffect } from "react";
import {
  loginProvider,
  loginType,
  postContextType,
  postsType,
} from "../../types/mainTypes";
import api_key from "../Services/Api_Url";

const postsContext = createContext<Partial<postContextType>>({});

const postsProvider: FC<loginProvider> = ({ children }): JSX.Element => {
  const [posts, setPosts] = useState<postsType>([]);
  const postsValue = { posts, setPosts };
  return (
    <>
      <postsContext.Provider value={postsValue}>
        {children}
      </postsContext.Provider>
    </>
  );
};

export const usePosts = () => useContext(postsContext);

export default postsProvider;
