const Certificate = require("../models/Certificate");
const ipfsService = require("../services/ipfsService");
const blockchainService = require("../services/blockchainService");
const fs = require("fs");

// Issue certificate
exports.issueCertificate = async (req, res) => {
  try {
    const { rollNumber } = req.body;
    const file = req.file;

    if (!file || !rollNumber) {
      return res.status(400).json({ message: "File and student required" });
    }

    // Upload to IPFS
    const ipfsHash = await ipfsService.uploadFile(file.path);

    // Call blockchain service
    await blockchainService.issueCertificate(rollNumber, ipfsHash);

    // Save in DB
    const cert = await Certificate.create({
      rollNumber,
      fileName: file.originalname,
      ipfsHash,
    });

    // Delete temporary upload
    fs.unlinkSync(file.path);

    res.status(201).json(cert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Fetch all issued certificates
exports.getAllCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
