// Script to check staking rewards
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

  // Get the staked balance
  const stakedBalance = await stakingContract.getStakedBalance(signerAddress);
  console.log(`Your staked balance: ${hre.ethers.formatUnits(stakedBalance, 18)} tokens`);

  // Get the earned rewards
  const earned = await stakingContract.earned(signerAddress);
  console.log(`Your earned rewards: ${hre.ethers.formatUnits(earned, 18)} tokens`);

  // Get the reward rate
  const rewardRate = await stakingContract.rewardRate();
  console.log(`Current reward rate: ${hre.ethers.formatUnits(rewardRate, 18)} tokens per second`);

  // Calculate daily rewards if the user has staked tokens
  if (stakedBalance > 0) {
    const totalStaked = await stakingContract.getTotalStaked();
    const dailyRewards = rewardRate * 86400n * stakedBalance / totalStaked;
    console.log(`Estimated daily rewards: ${hre.ethers.formatUnits(dailyRewards, 18)} tokens`);
  }
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
