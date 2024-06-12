import React from "react";
import Index from "./pages/Index";
import { Routes, Route, Navigate } from "react-router-dom";
import Events from "./components/Events";
import ViewEvents from "./components/ViewEvents";
import AddEvent from "./components/AddEvent";
import Login from "./components/auth/Login";
import Auth from "./pages/auth";
import AdminLogin from "./components/AdminLogin";
import "./style.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/events1" element={<Events />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/events" element={<ViewEvents />} />
        <Route path="/index" element={<Index />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};
export default App;
