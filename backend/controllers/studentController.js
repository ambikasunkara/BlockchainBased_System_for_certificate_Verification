const Student = require("../models/Student");

// Register a student
exports.registerStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all students (for Admin Dashboard)
exports.getAllStudents = async (req, res) => {
  try {
    // Only return fields needed for dashboard
    const students = await Student.find({}, { name: 1, rollNumber: 1 }).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
