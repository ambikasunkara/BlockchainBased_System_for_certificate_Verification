import React from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "../components/styles/Student.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const raw = localStorage.getItem("studentData");
  if (!raw) return <h2>No student data found. Please login again.</h2>;

  let data;
  try { data = JSON.parse(raw); } catch { return <h2>Error parsing student data.</h2>; }
  if (!Array.isArray(data) || data.length < 7) return <h2>Certificate not issued yet.</h2>;

  const [rollNumber, studentName, department, cgpa, graduationYear, division, certificateHash, timestamp] = data;

  return (
    <div className="student-home">
      <div className="student-header">
        <div className="student-header-title">Student Dashboard</div>
        <button className="student-return-btn" onClick={() => { localStorage.removeItem("studentData"); navigate("/"); }}>Logout</button>
      </div>

      <h1 className="student-dashboard-title">Welcome {studentName}</h1>

      <div className="student-cards">
        <div className="student-card">
          <h3>Student Details</h3>
          <p><b>Branch:</b> {department}</p>
          <p><b>CGPA:</b> {cgpa}</p>
          <p><b>Graduation Year:</b> {graduationYear}</p>
          <p><b>Division:</b> {division}</p>
        </div>

        <div className="student-card">
          <h3>Certificate</h3>
          <button className="student-btn" onClick={() => alert("Certificate Hash: " + certificateHash)}>View Certificate</button>
          <button className="student-btn" onClick={() => alert("Image Feature Coming Soon")}>View Image</button>
          <div style={{ marginTop: "20px" }}><QRCode value={certificateHash} size={150} /></div>
        </div>
      </div>

      <div className="footer">All Rights Reserved</div>
    </div>
  );
}

export default StudentDashboard;
