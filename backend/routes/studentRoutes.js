const express = require("express");
const router = express.Router();
const {
  registerStudent,
  getAllStudents,
} = require("../controllers/studentController");

// Register new student
router.post("/", registerStudent);

// Fetch all students (for dashboard)
router.get("/", getAllStudents);

module.exports = router;
