// Script to deploy the StakingContract
const hre = require("hardhat");

async function main() {
  console.log("Deploying StakingContract...");

  // Get the token address from command line arguments or use a default
  const tokenAddress = process.env.TOKEN_ADDRESS;
  if (!tokenAddress) {
    console.error("Please set the TOKEN_ADDRESS environment variable");
    process.exit(1);
  }

  // Set the reward rate (tokens per second)
  // 0.01 tokens per second = 864 tokens per day
  const rewardRate = hre.ethers.parseUnits("0.01", 18);

  // Deploy the contract
  const StakingContract = await hre.ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.deploy(tokenAddress, rewardRate);

  await stakingContract.waitForDeployment();

  const address = await stakingContract.getAddress();
  console.log(`StakingContract deployed to: ${address}`);
  console.log(`Using token at: ${tokenAddress}`);
  console.log(`Reward rate: ${hre.ethers.formatUnits(rewardRate, 18)} tokens per second`);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await stakingContract.deploymentTransaction().wait(5);
  console.log("Confirmed!");

  // Verify the contract on Etherscan if not on a local network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [tokenAddress, rewardRate],
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
