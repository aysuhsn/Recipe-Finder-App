// src/pages/unauthorized/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";
import { MdLockOutline } from "react-icons/md"; // kilid ikonu üçün

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-wrapper">
      <div className="unauthorized-overlay">
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>
          <MdLockOutline />
        </div>
        <div className="unauthorized-title">Access Denied</div>
        <div className="unauthorized-description">
          You don’t have permission to view this page.<br />Please go back to the home page.
        </div>
        <button className="unauthorized-button" onClick={() => navigate("/app")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
