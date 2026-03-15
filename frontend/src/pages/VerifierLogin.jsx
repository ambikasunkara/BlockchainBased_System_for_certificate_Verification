import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Student.css";

function VerifierLogin() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (company === "company" && password === "1234") {
      navigate("/verify-certificate");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="student-home">
      <div className="student-header">y
        <div className="student-header-title">Verifier Portal</div>
      </div>

      <h1 className="student-dashboard-title">Verifier Login</h1>

      <div className="student-cards" style={{ justifyContent: "center" }}>
        <div className="student-card" style={{ width: "40%" }}>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="student-input"
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="student-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="student-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>

      <div className="footer">All Rights Reserved</div>
    </div>
  );
}

export default VerifierLogin;
