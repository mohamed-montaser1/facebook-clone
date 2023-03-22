import { useState, useContext, createContext, FC } from "react";
import { loginProvider, loginType } from "../../types/mainTypes";

const LoginContext = createContext<Partial<loginType>>({});

let initialLogin: boolean =
  Boolean(localStorage.getItem("isLoggedin")) || false;

let jwtInitValue = String(localStorage.getItem("jwt")) || "";

const LoginProvider: FC<loginProvider> = ({ children }): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialLogin);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
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
      <LoginContext.Provider value={LoginValue}>
        {children}
      </LoginContext.Provider>
    </>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
