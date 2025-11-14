import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.css"
import CreateExpense from "./components/CreateExpense";
import ViewExpense from "./components/ViewExpense";
import About from "./components/About";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-expense" element={<ProtectedRoute><CreateExpense /></ProtectedRoute>} />
        <Route path="/view-expense" element={<ProtectedRoute><ViewExpense /></ProtectedRoute>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;
