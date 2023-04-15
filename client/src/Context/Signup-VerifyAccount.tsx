import React, { createContext, useContext, useState } from "react";
import { providerType } from "../../types/mainTypes";

type signUpContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const signUpContext = createContext<Partial<signUpContextType>>(null);

const initialEmailValue = localStorage.getItem("email") || "";
const initPasswordValue = localStorage.getItem("pass") || "";
const SignUpProvider = ({ children }: providerType): JSX.Element => {
  const [email, setEmail] = useState<string>(initialEmailValue);
  const [password, setPassword] = useState<string>(initPasswordValue);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };
  return (
    <>
      <signUpContext.Provider value={contextValue}>
        {children}
      </signUpContext.Provider>
    </>
  );
};

const useSignup = () => useContext(signUpContext);

export { SignUpProvider, useSignup };
