import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterStudent from "./pages/RegisterStudent";
import IssueCertificate from "./pages/IssueCertificate";
import ViewRecords from "./pages/ViewRecords";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";

// ✅ Add these two
import VerifierLogin from "./pages/VerifierLogin";
import CertificateVerification from "./pages/CertificateVerification";

function App() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/register-student" element={<RegisterStudent />} />
        <Route path="/admin/issue-certificate" element={<IssueCertificate />} />
        <Route path="/admin/view-records" element={<ViewRecords />} />

        {/* ================= STUDENT ROUTES ================= */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* ================= VERIFIER ROUTES ================= */}
        <Route path="/verifier-login" element={<VerifierLogin />} />
        <Route path="/verify-certificate" element={<CertificateVerification />} />

        {/* 404 Fallback */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>Page Not Found</h2>} />

      </Routes>
    </Router>
  );
}

export default App;
