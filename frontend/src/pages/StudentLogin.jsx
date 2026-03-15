import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/styles/Student.css";

function StudentLogin() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/student-login", { rollNumber, password });
      localStorage.setItem("studentData", JSON.stringify(res.data.student));
      navigate("/student-dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="student-home">
      <div className="student-header">
        <div className="student-header-title">Student Portal</div>
        <button className="student-return-btn" onClick={() => navigate("/")}>Return Home</button>
      </div>

      <h1 className="student-dashboard-title">Student Login</h1>

      <div className="student-cards" style={{ justifyContent: "center" }}>
        <div className="student-card" style={{ width: "40%" }}>
          <h3>Login to View Certificate</h3>
          <input type="text" placeholder="Enter Roll Number" className="student-input" onChange={e => setRollNumber(e.target.value)} />
          <input type="password" placeholder="Enter Password" className="student-input" onChange={e => setPassword(e.target.value)} />
          <button className="student-btn" onClick={handleLogin}>Login</button>
        </div>
      </div>

      <div className="footer">All Rights Reserved</div>
    </div>
  );
}

export default StudentLogin;
