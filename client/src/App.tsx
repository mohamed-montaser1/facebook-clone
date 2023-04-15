import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginProvider, { useLogin } from "./Context/Login";
import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./Components/Navbar";

export default function App() {
  const { isLoggedIn, isSignedUp } = useLogin();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainPage />
            ) : isSignedUp ? (
              <Navigate to={"/verify-email"} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/verify-email"
          element={isSignedUp ? <VerifyEmail /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </Router>
  );
}
