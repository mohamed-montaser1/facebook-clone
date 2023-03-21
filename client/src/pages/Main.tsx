import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useLogin } from "../Context/Login";

export default function MainPage() {
  return (
    <form>
      <Navbar />
    </form>
  );
}
