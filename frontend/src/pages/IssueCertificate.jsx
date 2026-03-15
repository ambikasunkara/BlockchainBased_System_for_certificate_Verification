import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";

import "../components/styles/IssueCertificate.css";

const IssueCertificate = () => {
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState({
    studentName: "",
    rollNumber: "",
    department: "",
    cgpa: "",
    graduationYear: "",
    division: "",
    certificateFile: null,
    studentPhoto: null
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null); // Stores hash and txId

  const handleChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessData(null); // Reset previous success message

    try {
      const formData = new FormData();
      Object.keys(certificate).forEach((key) => {
        formData.append(key, certificate[key]);
      });

      const response = await axios.post(
  "http://localhost:5000/api/certificates/issue",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);

      const { certificateHash, transactionHash } = response.data;

      setSuccessData({ certificateHash, transactionHash });

      setCertificate({
        studentName: "",
        rollNumber: "",
        department: "",
        cgpa: "",
        graduationYear: "",
        division: "",
        certificateFile: null,
        studentPhoto: null
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error issuing certificate!");
    }

    setLoading(false);
  };

  return (
    <div className="issue-certificate-page">

      {/* HEADER */}
      <header className="page-header">
        <h1 className="page-title">Issue Certificate</h1>
        <button className="return-btn" onClick={() => navigate("/admin")}>
          Return to Dashboard
        </button>
      </header>

      {/* FORM SECTION */}
      <main className="form-wrapper">
        <div className="form-container">
          <h2 className="form-heading">Certificate Details</h2>

          <form className="admin-form" onSubmit={handleSubmit}>

            <label>Student Name</label>
            <input name="studentName" value={certificate.studentName} onChange={handleChange} required />

            <label>Student ID / Roll Number</label>
            <input name="rollNumber" value={certificate.rollNumber} onChange={handleChange} required />

            <label>Department</label>
            <input name="department" value={certificate.department} onChange={handleChange} required />

            <label>CGPA</label>
            <input type="number" step="0.01" name="cgpa" value={certificate.cgpa} onChange={handleChange} required />

            <label>Year of Graduation</label>
            <input type="number" name="graduationYear" value={certificate.graduationYear} onChange={handleChange} required />

            <label>Class / Division</label>
            <input name="division" value={certificate.division} onChange={handleChange} required />

            <label>Upload Certificate PDF</label>
            <input type="file" name="certificateFile" accept="application/pdf" onChange={handleFileChange}  />

            <label>Upload Student Photo (JPG)</label>
            <input type="file" name="studentPhoto" accept="image/jpg" onChange={handleFileChange} />

            <button type="submit" className="issue-btn" disabled={loading}>
              {loading ? "Processing..." : "Issue Certificate & Register Hash"}
            </button>
          </form>

          {/* SUCCESS MESSAGE */}
          {successData && (
            <div className="success-message">
              <h3>✅ Certificate issuance successful!</h3>
              <p>Certificate has been registered on the blockchain.</p>
              <p><strong>Certificate Hash (ID):</strong> {successData.certificateHash}</p>
              <p><strong>Transaction Hash:</strong> {successData.transactionHash}</p>

              <div className="qr-code">
                <QRCode
                  value={successData.certificateHash}
                  size={200}
                  bgColor="#fff"
                  fgColor="#080708"
                  level="H"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        All Rights Reserved | Blockchain Certificate System | Issue Certificate
      </footer>
    </div>
  );
};

export default IssueCertificate;