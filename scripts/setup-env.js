// Script to set up environment variables for local testing
const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

async function main() {
  console.log("Setting up environment for local testing...");

  // Deploy MockToken
  console.log("Deploying MockToken...");
  const MockToken = await ethers.getContractFactory("MockToken");
  const mockToken = await MockToken.deploy("Quantlink Token", "QNTL", 1000000);
  await mockToken.waitForDeployment();
  const tokenAddress = await mockToken.getAddress();
  console.log(`MockToken deployed to: ${tokenAddress}`);

  // Deploy StakingContract
  console.log("Deploying StakingContract...");
  const rewardRate = ethers.parseUnits("0.01", 18);
  const StakingContract = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.deploy(tokenAddress, rewardRate);
  await stakingContract.waitForDeployment();
  const stakingContractAddress = await stakingContract.getAddress();
  console.log(`StakingContract deployed to: ${stakingContractAddress}`);

  // Transfer some tokens to the staking contract for rewards
  console.log("Transferring tokens to the staking contract for rewards...");
  await mockToken.transfer(stakingContractAddress, ethers.parseUnits("100000", 18));
  console.log("Tokens transferred!");

  // Create or update .env.local file
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = `# Local testing environment variables
TOKEN_ADDRESS=${tokenAddress}
STAKING_CONTRACT_ADDRESS=${stakingContractAddress}
`;

  fs.writeFileSync(envPath, envContent);
  console.log(`Environment variables saved to ${envPath}`);
  console.log("\nTo use these variables for local testing, run:");
  console.log("source .env.local");
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
