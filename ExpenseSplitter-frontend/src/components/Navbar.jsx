import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiExpense } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="logo-name">
        <GiExpense id="lg" />
        <Link to={"/"} className="td-none">
          <h2 className="logo">SplitEase</h2>
        </Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <span className="user-name">{user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to={"/about"}>About</Link>
        <Link to={"https://github.com/KrishnaAwasthi28/"}>Github</Link>
      </div>
    </nav>
  );
};

export default Navbar;
