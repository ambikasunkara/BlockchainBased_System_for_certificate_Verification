const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certId: {
      type: String,
      required: true,
      unique: true,
    },
    studentName: String,
    degree: String,
    university: String,
    year: Number,
    ipfsHash: String,
    blockchainTx: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
