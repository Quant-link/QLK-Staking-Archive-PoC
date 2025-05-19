// Script to unstake tokens
const hre = require("hardhat");

async function main() {
  // Get the staking contract address from environment variables
  const stakingContractAddress = process.env.STAKING_CONTRACT_ADDRESS;
  
  if (!stakingContractAddress) {
    console.error("Please set the STAKING_CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  // Get the amount to unstake from command line arguments or use a default
  const amount = process.argv[2] 
    ? hre.ethers.parseUnits(process.argv[2], 18) 
    : hre.ethers.parseUnits("50", 18); // Default 50 tokens

  console.log(`Unstaking ${hre.ethers.formatUnits(amount, 18)} tokens...`);

  // Get the staking contract
  const stakingContract = await hre.ethers.getContractAt("StakingContract", stakingContractAddress);

  // Get the current staked balance
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress();
  const stakedBalance = await stakingContract.getStakedBalance(signerAddress);
  console.log(`Your current staked balance: ${hre.ethers.formatUnits(stakedBalance, 18)} tokens`);

  // Check if the user has enough staked tokens
  if (stakedBalance < amount) {
    console.error(`Error: You don't have enough staked tokens. You only have ${hre.ethers.formatUnits(stakedBalance, 18)} tokens staked.`);
    process.exit(1);
  }

  // Unstake tokens
  const tx = await stakingContract.unstake(amount);
  console.log(`Transaction hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  console.log("Waiting for transaction confirmation...");
  await tx.wait();
  console.log("Transaction confirmed!");

  // Check the updated staked balance
  const newStakedBalance = await stakingContract.getStakedBalance(signerAddress);
  console.log(`Your new staked balance: ${hre.ethers.formatUnits(newStakedBalance, 18)} tokens`);

  // Check the total staked
  const totalStaked = await stakingContract.getTotalStaked();
  console.log(`Total staked in contract: ${hre.ethers.formatUnits(totalStaked, 18)} tokens`);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
