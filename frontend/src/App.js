import React from "react";
import Index from "./pages/Index";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Login from "./components/auth/Login";
import "./style.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </>
  );
};
export default App;
