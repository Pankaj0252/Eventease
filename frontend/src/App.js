import React from "react";
import Index from "./pages/Index";
import { Routes, Route, Navigate } from "react-router-dom";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";
import Auth from "./pages/auth";
import "./style.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </>
  );
};
export default App;
