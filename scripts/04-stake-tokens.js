// Script to stake tokens
const hre = require("hardhat");

async function main() {
  // Get the staking contract address from environment variables
  const stakingContractAddress = process.env.STAKING_CONTRACT_ADDRESS;
  
  if (!stakingContractAddress) {
    console.error("Please set the STAKING_CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  // Get the amount to stake from command line arguments or use a default
  const amount = process.argv[2] 
    ? hre.ethers.parseUnits(process.argv[2], 18) 
    : hre.ethers.parseUnits("100", 18); // Default 100 tokens

  console.log(`Staking ${hre.ethers.formatUnits(amount, 18)} tokens...`);

  // Get the staking contract
  const stakingContract = await hre.ethers.getContractAt("StakingContract", stakingContractAddress);

  // Stake tokens
  const tx = await stakingContract.stake(amount);
  console.log(`Transaction hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  console.log("Waiting for transaction confirmation...");
  await tx.wait();
  console.log("Transaction confirmed!");

  // Check the staked balance
  const signer = await hre.ethers.provider.getSigner();
  const signerAddress = await signer.getAddress();
  const stakedBalance = await stakingContract.getStakedBalance(signerAddress);
  console.log(`Your staked balance: ${hre.ethers.formatUnits(stakedBalance, 18)} tokens`);

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
