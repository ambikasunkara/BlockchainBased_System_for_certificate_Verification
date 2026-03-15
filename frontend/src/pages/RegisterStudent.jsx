import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/styles/RegisterStudent.css";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    rollNumber: "",
    fullName: "",
    email: "",
    tempPassword: "",
    department: "",
    graduationYear: "",
    cgpa: "",
    finalGrade: ""
  });
  const [loading, setLoading] = useState(false);

  // Update state for all fields
  const handleChange = (e) => {
    let value = e.target.value;

    // Force Graduation Year and CGPA to string
    if (e.target.name === "graduationYear" || e.target.name === "cgpa") {
      value = value.toString();
    }

    setStudent({ ...student, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send all fields as strings to backend
      const res = await axios.post(
  "http://localhost:5000/api/students",
  student
);

if (res.data.success) {
  alert("Student Registered!\nTx Hash: " + res.data.txHash);
} else {
  alert("Registration failed");
}


      setStudent({
        rollNumber: "",
        fullName: "",
        email: "",
        tempPassword: "",
        department: "",
        graduationYear: "",
        cgpa: "",
        finalGrade: ""
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error registering student!");
    }

    setLoading(false);
  };

  return (
    <div className="register-student-page">

      {/* HEADER */}
      <header className="page-header">
        <h1 className="page-title">Registration of New Student</h1>
        <button className="return-btn" onClick={() => navigate("/admin")}>
          Return to Dashboard
        </button>
      </header>

      {/* FORM CENTERED */}
      <main className="form-wrapper">
        <div className="form-container">
          <form className="admin-form" onSubmit={handleSubmit}>

            <label>Roll Number</label>
            <input name="rollNumber" value={student.rollNumber} onChange={handleChange} required />

            <label>Full Name</label>
            <input name="fullName" value={student.fullName} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" value={student.email} onChange={handleChange} required />

            <label>Temporary Password</label>
            <input name="tempPassword" value={student.tempPassword} onChange={handleChange} required />

            <label>Department</label>
            <input name="department" value={student.department} onChange={handleChange} required />

            <label>Year of Graduation</label>
            <input type="number" name="graduationYear" value={student.graduationYear} onChange={handleChange} required />

            <label>CGPA</label>
            <input type="number" step="0.01" name="cgpa" value={student.cgpa} onChange={handleChange} required />

            <label>Final Grade</label>
            <input name="finalGrade" value={student.finalGrade} onChange={handleChange} required />

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register Student"}
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        All Rights Reserved | Blockchain Certificate System | Registration of New Student
      </footer>
    </div>
  );
};

export default RegisterStudent;
