import React from "react";

export interface loginType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export type loginProvider = {
  // children: Array<JSX.Element>;
  children: React.ReactNode;
};
