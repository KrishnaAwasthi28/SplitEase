import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home-container">
      {user ? (
        <div className="logged-home">
          <h2>Welcome back, {user.name} 👋</h2>
          <p>
            Split Smarter. Share Instantly...⭐
          </p>
          <div className="home-buttons">
            <button onClick={() => navigate("/create-expense")}>
              Create an Expense
            </button>
            <button onClick={() => navigate("/view-expense")}>
              View My Expenses
            </button>
          </div>
          <div className="hero-section">
            <p className="subtitle">
              Simplify expense sharing with your friends, family, or roommates.
              Track, split, and settle — all in one place!
            </p>
            <div className="illustration">
              <img src="diagram.png" alt="Expense Illustration" />
            </div>
          </div>
        </div>
      ) : (
        <div className="hero-section">
          <h1 className="title">💸 Expense Splitter</h1>
          <p className="subtitle">
            Simplify expense sharing with your friends, family, or roommates.
            Track, split, and settle — all in one place!
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/register")}>Get Started</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
          <div className="illustration">
            <img src="diagram.png" alt="Expense Illustration" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
