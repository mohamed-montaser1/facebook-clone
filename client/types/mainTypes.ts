import React from "react";

export interface loginType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedUp: boolean;
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  alreadyExist: boolean;
  setAlreadyExist: React.Dispatch<React.SetStateAction<boolean>>;
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}

export type loginProvider = {
  // children: Array<JSX.Element>;
  children: React.ReactNode;
};

export interface SignupType {
  username: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}
