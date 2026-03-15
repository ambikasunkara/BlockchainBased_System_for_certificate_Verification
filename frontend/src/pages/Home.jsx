import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <h1>
          <span className="highlight">Blockchain</span> Certificate Verification System
        </h1>
        <p>
          Secure, tamper-proof academic certificates powered by blockchain technology.
        </p>
        <button className="btn">Learn More →</button>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="section">
        <h2 className="section-title">
          <span className="highlight">Key Features</span>
        </h2>
        <div className="features-row">
          <div className="card">
            <h3>Blockchain Security</h3>
            <p>Immutable certificate storage using smart contracts.</p>
          </div>
          <div className="card">
            <h3>QR Verification</h3>
            <p>Instant verification using QR code scanning.</p>
          </div>
          <div className="card">
            <h3>Fraud Prevention</h3>
            <p>Eliminates fake and duplicate certificates permanently.</p>
          </div>
          <div className="card">
            <h3>Secure Access</h3>
            <p>Role-based secure portals for all users.</p>
          </div>
        </div>
      </section>

      {/* ===== ACCESS PORTAL ===== */}
      <section className="section access-section">
        <h2 className="section-title">
          <span className="highlight">Access Portal</span>
        </h2>

        <div className="portal-row">
          <div className="card">
            <h3>Admin Panel</h3>
            <p>Issue certificates, manage students, and view records securely.</p>
            <button className="small-btn" onClick={() => navigate("/admin")}>
              Access Admin →
            </button>
          </div>

          <div className="card">
            <h3>Verifier</h3>
            <p>Instantly verify certificate authenticity using blockchain.</p>
            <button className="small-btn" onClick={() => navigate("/verifier-login")}>
              Access Verifier →
            </button>
          </div>

          <div className="card">
            <h3>Student Portal</h3>
            <p>View certificates, generate QR codes, and share verified credentials.</p>
            <button className="small-btn" onClick={() => navigate("/student-login")}>
              Access Student →
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2026 Blockchain Certificate System. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
