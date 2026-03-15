const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    tempPassword: { type: String, required: true },
    department: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    cgpa: { type: Number, required: true },
    finalGrade: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
