import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import LoginProvider from "./Context/Login";
const root = createRoot(document.getElementById("root"));

root.render(
  <LoginProvider>
    <App />
  </LoginProvider>
);
