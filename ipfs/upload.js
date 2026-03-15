require("dotenv").config();
const fs = require("fs");
const { NFTStorage, File } = require("nft.storage");

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function uploadToIPFS(filePath) {
  const client = new NFTStorage({ token: API_KEY });

  const data = fs.readFileSync(filePath);
  const fileName = filePath.split("/").pop();

  const cid = await client.storeBlob(new File([data], fileName));
  console.log("File uploaded to IPFS with CID:", cid);

  return cid.toString();
}

module.exports = { uploadToIPFS };
