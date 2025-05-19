// Script to deploy the MockToken contract
const hre = require("hardhat");

async function main() {
  console.log("Deploying MockToken contract...");

  // Token parameters
  const name = "Quantlink Token";
  const symbol = "QNTL";
  const initialSupply = 1000000; // 1 million tokens

  // Deploy the contract
  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const mockToken = await MockToken.deploy(name, symbol, initialSupply);

  await mockToken.waitForDeployment();

  const address = await mockToken.getAddress();
  console.log(`MockToken deployed to: ${address}`);
  console.log(`Token Name: ${name}`);
  console.log(`Token Symbol: ${symbol}`);
  console.log(`Initial Supply: ${initialSupply} ${symbol}`);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await mockToken.deploymentTransaction().wait(5);
  console.log("Confirmed!");

  // Verify the contract on Etherscan if not on a local network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [name, symbol, initialSupply],
      });
      console.log("Contract verified on Etherscan!");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }

  return address;
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
