import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MainContent from "../Components/MainContent";
import Navbar from "../Components/Navbar";
import { useLogin } from "../Context/Login";

export default function MainPage() {
  return (
    <>
      <Navbar />
      <MainContent />
    </>
  );
}
