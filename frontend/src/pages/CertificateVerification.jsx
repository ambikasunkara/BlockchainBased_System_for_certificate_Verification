 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

import "../components/styles/Student.css";

function CertificateVerification() {
  const navigate = useNavigate();
  const [hash, setHash] = useState("");
  const [result, setResult] = useState("");
  const [scan, setScan] = useState(false);

  const verifyCertificate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/verify-certificate/${hash}`
      );

      if (res.data.valid) {
        setResult("✅ Valid Certificate");
      } else {
        setResult("❌ Invalid Certificate");
      }
    } catch {
      setResult("❌ Invalid Certificate");
    }
  };

  return (
    <div className="student-home">
      <div className="student-header">
        <div className="student-header-title">Certificate Verification</div>
        <button
          className="student-return-btn"
          onClick={() => navigate("/verifier-login")}
        >
          Logout
        </button>
      </div>

      <h1 className="student-dashboard-title">Certificate Verification</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        Verify the authenticity of a university-issued certificate using
        blockchain technology.
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button className="student-btn" onClick={() => setScan(true)}>
          Scan with Camera
        </button>
        <button className="student-btn">
          Upload QR Code
        </button>
      </div>

      {scan && (
        <div style={{ width: "300px", margin: "20px auto" }}>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                setHash(result?.text);
                setScan(false);
              }
            }}
          />
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Or Enter Manually</p>
        <input
          type="text"
          placeholder="Enter Certificate Hash"
          className="student-input"
          style={{ width: "40%" }}
          onChange={(e) => setHash(e.target.value)}
        />
        <br />
        <button
          className="student-btn"
          style={{ marginTop: "15px" }}
          onClick={verifyCertificate}
        >
          Verify Certificate
        </button>
      </div>

      {result && (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>{result}</h2>
      )}

      <div className="footer">All Rights Reserved @verifier portal</div>
    </div>
  );
}

export default CertificateVerification;
