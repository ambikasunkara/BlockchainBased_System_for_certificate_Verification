import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch registered students on load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/api/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
      setLoading(false);
    };
    fetchStudents();
  }, []);

  return (
    <div className="admin-home">

      {/* Header */}
      <div className="admin-header">
        <h1 className="header-title">Certificate Admin Panel</h1>
        <button
          className="return-home-btn"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>

      {/* Dashboard Heading */}
      <h1 className="dashboard-title">Admin Actions</h1>

      {/* Cards Row */}
      <div className="admin-cards-row">

        {/* Register Student */}
        <div className="card">
          <h3>Register Student</h3>
          <p>Add new student details to the system. This step is required before issuing certificates.</p>
          <button
            className="small-btn"
            onClick={() => navigate("/admin/register-student")}
          >
            Go
          </button>
        </div>

        {/* Issue Certificate */}
        <div className="card">
          <h3>Issue Certificate</h3>
          <p>Generate blockchain-based certificates for registered students.</p>
          <button
            className="small-btn"
            onClick={() => navigate("/admin/issue-certificate")}
            disabled={loading || students.length === 0}
            title={students.length === 0 ? "Register at least one student first" : ""}
          >
            Go
          </button>
        </div>

        {/* View All Records */}
        <div className="card">
          <h3>View All Records</h3>
          <p>Check all students and issued certificates in the system.</p>
          <button
            className="small-btn"
            onClick={() => navigate("/admin/view-records")}
          >
            Go
          </button>
        </div>

      </div>

      {/* Admin Note */}
      <div className="admin-note">
        <p>
          <strong>Important:</strong> You must complete <strong> Step 1: Register Student </strong> 
          before you can <strong> Step 2: Issue Certificate </strong> for that student.
        </p>
      </div>

      {/* Footer */}
      <div className="footer">
        All Rights Reserved | Blockchain Certificate System | Admin Access
      </div>

    </div>
  );
};

export default AdminDashboard;
