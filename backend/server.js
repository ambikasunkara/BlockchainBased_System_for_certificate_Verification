const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- FILE UPLOAD ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

async function startServer() {
  const web3 = new Web3("http://127.0.0.1:7545"); // Ganache RPC
  const accounts = await web3.eth.getAccounts();
  const adminAccount = accounts[0];

  const abi = JSON.parse(fs.readFileSync(path.join(__dirname, "DegreeVerificationABI.json")));
  const contractAddress = "0x9fB70aaa798b1EaDffF0A4bfEcDBC5b104A8F214";
  const contract = new web3.eth.Contract(abi, contractAddress);

  // ---------------- REGISTER STUDENT ----------------
  app.post("/api/students", async (req, res) => {
    try {
      const { rollNumber, fullName, email, department, graduationYear, cgpa, finalGrade, tempPassword } = req.body;

      const tx = await contract.methods
        .registerStudent(rollNumber, fullName, email, department, graduationYear.toString(), cgpa.toString(), finalGrade, tempPassword)
        .send({ from: adminAccount, gas: 3000000 });

      res.json({ success: true, transactionHash: tx.transactionHash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ---------------- ISSUE CERTIFICATE ----------------
  app.post("/api/certificates/issue", upload.fields([{ name: "certificateFile" }, { name: "studentPhoto" }]), async (req, res) => {
    try {
      const { studentName, rollNumber, department, cgpa, graduationYear, division } = req.body;

      const certificateHash = web3.utils.keccak256(studentName + rollNumber + department + cgpa + graduationYear + division + Date.now());

      const tx = await contract.methods
        .issueCertificate(rollNumber, studentName, department, cgpa.toString(), graduationYear.toString(), division, certificateHash)
        .send({ from: adminAccount, gas: 3000000 });

      res.json({ certificateHash, transactionHash: tx.transactionHash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ---------------- STUDENT LOGIN ----------------
  app.post("/student-login", async (req, res) => {
    try {
      const { rollNumber, password } = req.body; // <-- must match frontend

      const isValid = await contract.methods.verifyStudent(rollNumber, password).call();
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

      const cert = await contract.methods.getCertificate(rollNumber).call();
      res.json({ success: true, student: Object.values(cert) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(5000, () => console.log("Backend running at http://localhost:5000"));
}

startServer();