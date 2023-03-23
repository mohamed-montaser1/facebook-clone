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

export interface postContextType {
  posts: postsType,
  setPosts: React.Dispatch<React.SetStateAction<postsType>>
}

export interface userType {
  x: boolean;
}

export type loginProvider = {
  // children: Array<JSX.Element>;
  children: React.ReactNode;
};

export type userProvider = {
  // children: Array<JSX.Element>;
  children: React.ReactNode;
};

export interface SignupType {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export type postsType = Array<{
  _id: string;
  author_name: string;
  author_avatar: string;
  content: string;
  likes_count: number;
  comments_content: Array<string>;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
}>;
