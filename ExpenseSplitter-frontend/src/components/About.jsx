import React from "react";
import { FaUsers, FaMoneyBillWave, FaBalanceScale } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About Expense Splitter</h1>
        <p className="about-description">
          Expense Splitter is a simple and smart web app designed to make sharing expenses
          with friends, family, or roommates easier. Whether you’re on a trip, hosting a party,
          or managing monthly bills — Expense Splitter helps you track who paid what and ensures
          fairness in every split.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3 className="feature-title">Group Management</h3>
            <p className="feature-text">
              Easily create and manage groups for trips, events, or shared living.
            </p>
          </div>

          <div className="feature-card">
            <FaMoneyBillWave className="feature-icon" />
            <h3 className="feature-title">Track Every Expense</h3>
            <p className="feature-text">
              Log who paid how much and automatically calculate splits for everyone.
            </p>
          </div>

          <div className="feature-card">
            <FaBalanceScale className="feature-icon" />
            <h3 className="feature-title">Fair Settlements</h3>
            <p className="feature-text">
              Get clear insights into how much each person owes or should receive.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <h2 className="footer-title">Why We Built This</h2>
          <p className="footer-text">
            Managing shared expenses manually can be confusing. Expense Splitter was created
            to bring transparency and simplicity to group finances — making money management
            stress-free for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
