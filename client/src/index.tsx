import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createRoot } from "react-dom/client";
import App from "./App";
import LoginProvider from "./Context/Login";
import UserProvider from "./Context/User";
import PostProvider from "./Context/Post";
import { SignUpProvider } from "./Context/Signup-VerifyAccount";
const root = createRoot(document.getElementById("root"));

root.render(
  <LoginProvider>
    <UserProvider>
      <PostProvider>
        <SignUpProvider>
          <App />
        </SignUpProvider>
      </PostProvider>
    </UserProvider>
  </LoginProvider>
);
