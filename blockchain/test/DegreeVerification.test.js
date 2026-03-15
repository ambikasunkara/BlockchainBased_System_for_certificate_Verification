const { expect } = require("chai");

describe("DegreeVerification", function () {
  let contract;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const DegreeVerification = await ethers.getContractFactory("DegreeVerification");
    contract = await DegreeVerification.deploy();
    await contract.deployed();
  });

  it("Should issue and verify a degree", async function () {
    await contract.issueDegree(
      "Ambika",
      "ABC University",
      "B.Tech",
      2025,
      "QmTestHash"
    );

    const degreeId = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["string", "string", "uint256", "string"],
        ["Ambika", "B.Tech", 2025, "QmTestHash"]
      )
    );

    const result = await contract.verifyDegree(degreeId);
    expect(result[0]).to.equal("Ambika");
  });
});
