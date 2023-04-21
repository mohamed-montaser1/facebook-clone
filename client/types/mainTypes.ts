import React, { FC } from "react";

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
  posts: postsType;
  setPosts: React.Dispatch<React.SetStateAction<postsType>>;
}

export interface UserContextType {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  getUserData: () => void;
}

export interface PostContextType {
  author_name: string;
  setAuthor_name: setString;
}

export interface userType {
  x: boolean;
}

export type providerType = {
  // children: Array<JSX.Element>;
  children: React.ReactNode;
};

export type postsProviderType = {
  children: JSX.Element | JSX.IntrinsicElements;
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
  date: Date;
}>;

export type comments = Array<{
  username: string;
  user_avatar: string;
  user_comment: string;
}>;

export type setString = React.Dispatch<React.SetStateAction<string>>;
export type setNumber = React.Dispatch<React.SetStateAction<number>>;
export type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type postType = {
  likes: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  loves: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  haha: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  wow: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  sad: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  care: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  angry: {
    count: number;
    users: [
      {
        username: string;
        user_avatar: string;
      }
    ];
  };
  author_avatar: string;
  author_name: string;
  image: string;
  comments_content: Array<{
    username: string;
    user_avatar: string;
    user_comment: string;
  }>;
  comments_count: number;
  content: string;
  createdAt: Date;
  date?: Date;
  updatedAt: Date;
  _id: string;
};
