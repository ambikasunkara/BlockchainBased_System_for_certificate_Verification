const axios = require("axios");

async function retrieveFromIPFS(cid) {
  const url = `https://ipfs.io/ipfs/${cid}`;
  const response = await axios.get(url);
  return response.data;
}

module.exports = { retrieveFromIPFS };
