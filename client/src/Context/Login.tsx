import { useState, useContext, createContext, FC } from "react";
import { loginProvider, loginType } from "../../types/mainTypes";

const LoginContext = createContext<Partial<loginType>>({});

const LoginProvider: FC<loginProvider> = ({ children }): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const LoginValue = {
    isLoggedIn,
    setIsLoggedIn,
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
