async function main() {
  const Degree = await ethers.getContractFactory("DegreeVerification");
  const degree = await Degree.deploy();
  await degree.waitForDeployment();
  console.log("Contract deployed to:", await degree.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
