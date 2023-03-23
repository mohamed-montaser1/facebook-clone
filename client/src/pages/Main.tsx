import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MainContent from "../Components/MainContent";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useLogin } from "../Context/Login";

export default function MainPage() {
  return (
    <>
      <Navbar />
      <div className="page">
        <Sidebar />
        <MainContent />
      </div>
    </>
  );
}
