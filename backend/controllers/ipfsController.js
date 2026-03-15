import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({
  token: process.env.NFT_STORAGE_API_KEY
});

export const uploadToIPFS = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = new File(
      [req.file.buffer],
      req.file.originalname,
      { type: req.file.mimetype }
    );

    const cid = await client.storeBlob(file);

    res.status(200).json({
      success: true,
      cid,
      ipfsUrl: `https://ipfs.io/ipfs/${cid}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "IPFS upload failed" });
  }
};
