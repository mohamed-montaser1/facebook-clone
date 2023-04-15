import { useState, useContext, createContext, FC } from "react";
import { providerType, loginType } from "../../types/mainTypes";

const loginContext = createContext<Partial<loginType>>({});

let initialLogin: boolean =
  Boolean(localStorage.getItem("isLoggedin")) || false;

let initialSignup: boolean =
  Boolean(localStorage.getItem("isSignedup")) || false;

let jwtInitValue = String(localStorage.getItem("jwt")) || "";

const LoginProvider: FC<providerType> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialLogin);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(initialSignup);
  const [jwt, setJwt] = useState<string>(jwtInitValue);

  const LoginValue = {
    isLoggedIn,
    setIsLoggedIn,
    alreadyExist,
    setAlreadyExist,
    isSignedUp,
    setIsSignedUp,
    jwt,
    setJwt,
  };
  return (
    <>
      <loginContext.Provider value={LoginValue}>
        {children}
      </loginContext.Provider>
    </>
  );
};

export const useLogin = () => useContext(loginContext);

export default LoginProvider;
