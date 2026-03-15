import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/AdminPages.css";

const ViewRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("/api/students"); // include certificates if your backend sends them
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="admin-page">
      <h2>All Students & Certificates</h2>
      <table className="records-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Certificate ID</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.course}</td>
              <td>{r.certificateId || "Not issued"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRecords;
