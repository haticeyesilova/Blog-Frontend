import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Register from "./components/Register";
import Login from "./components/Login";
import BlogDetail from "./components/BlogDetail";

import "./style.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/add" element={<BlogForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
