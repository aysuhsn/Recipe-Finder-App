import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const context = useLanguage?.(); // Hook mövcuddursa
  const translations = context?.translations || {};

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className={`not-found-container ${isDarkMode ? "dark" : ""}`}>
      <div className="not-found-title">404</div>
      <div className="not-found-text">
        {translations.notFoundTitle || "Page Not Found"}
      </div>
      <div className="not-found-description">
        {translations.notFoundDescription || "Sorry, the page you are looking for doesn't exist."}
      </div>
      <Link to="/app">
        <button className="not-found-button">
          {translations.goHome || "Go Home"}
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
