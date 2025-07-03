// src/pages/notfound/NotFound.jsx

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const { translations } = useLanguage();
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className={`not-found-container ${isDarkMode ? "dark" : ""}`}>
      <div className="not-found-title">404</div>
      <div className="not-found-text">{translations.notFoundTitle}</div>
      <div className="not-found-description">{translations.notFoundDescription}</div>
      <Link to="/app">
        <button className="not-found-button">{translations.goHome}</button>
      </Link>
    </div>
  );
};

export default NotFound;
