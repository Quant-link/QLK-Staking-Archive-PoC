// Script to claim staking rewards
const hre = require("hardhat");

async function main() {
  // Get the staking contract address from environment variables
  const stakingContractAddress = process.env.STAKING_CONTRACT_ADDRESS;
  
  if (!stakingContractAddress) {
    console.error("Please set the STAKING_CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  // Get the staking contract
  const stakingContract = await hre.ethers.getContractAt("StakingContract", stakingContractAddress);

  // Get the signer address
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress();

  // Get the earned rewards
  const earned = await stakingContract.earned(signerAddress);
  console.log(`Your earned rewards: ${hre.ethers.formatUnits(earned, 18)} tokens`);

  // Check if there are rewards to claim
  if (earned <= 0) {
    console.log("No rewards to claim.");
    process.exit(0);
  }

  console.log("Claiming rewards...");

  // Claim rewards
  const tx = await stakingContract.claimReward();
  console.log(`Transaction hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  console.log("Waiting for transaction confirmation...");
  await tx.wait();
  console.log("Transaction confirmed!");

  // Check the new earned rewards (should be 0)
  const newEarned = await stakingContract.earned(signerAddress);
  console.log(`Your new earned rewards: ${hre.ethers.formatUnits(newEarned, 18)} tokens`);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
