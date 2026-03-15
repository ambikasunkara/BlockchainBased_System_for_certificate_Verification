const express = require("express");
const router = express.Router();
const { issueCertificate, getAllCertificates } = require("../controllers/certificateController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Issue certificate
router.post("/", upload.single("file"), issueCertificate);

// Get all certificates (for View Records)
router.get("/", getAllCertificates);

module.exports = router;
