import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createRoot } from "react-dom/client";
import App from "./App";
import LoginProvider from "./Context/Login";

const root = createRoot(document.getElementById("root"));

root.render(
  <LoginProvider>
    <App />
  </LoginProvider>
);
