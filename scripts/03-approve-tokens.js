// Script to approve tokens for staking
const hre = require("hardhat");

async function main() {
  // Get the token and staking contract addresses from environment variables
  const tokenAddress = process.env.TOKEN_ADDRESS;
  const stakingContractAddress = process.env.STAKING_CONTRACT_ADDRESS;
  
  if (!tokenAddress || !stakingContractAddress) {
    console.error("Please set the TOKEN_ADDRESS and STAKING_CONTRACT_ADDRESS environment variables");
    process.exit(1);
  }

  // Get the amount to approve from command line arguments or use a default
  const amount = process.argv[2] 
    ? hre.ethers.parseUnits(process.argv[2], 18) 
    : hre.ethers.parseUnits("1000", 18); // Default 1000 tokens

  console.log(`Approving ${hre.ethers.formatUnits(amount, 18)} tokens for staking contract...`);

  // Get the token contract
  const token = await hre.ethers.getContractAt("MockToken", tokenAddress);

  // Approve the staking contract to spend tokens
  const tx = await token.approve(stakingContractAddress, amount);
  console.log(`Transaction hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  console.log("Waiting for transaction confirmation...");
  await tx.wait();
  console.log("Transaction confirmed!");

  // Check the allowance
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress();
  const allowance = await token.allowance(signerAddress, stakingContractAddress);
  console.log(`Allowance for staking contract: ${hre.ethers.formatUnits(allowance, 18)} tokens`);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
