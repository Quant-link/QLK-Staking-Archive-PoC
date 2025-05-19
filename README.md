# Quantlink Basic Staking POC

A comprehensive proof-of-concept implementation of an Ethereum staking platform deployed on the Sepolia Testnet. This project demonstrates professional on-chain interaction with a complete staking mechanism, including token deployment, staking, unstaking, and reward distribution with time-based calculations.

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Hardhat](https://img.shields.io/badge/Hardhat-yellow?style=for-the-badge)
![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-4E5EE4?logo=OpenZeppelin&style=for-the-badge&logoColor=fff)

## Overview

This project implements a professional staking system with the following features:

- **ERC-20 Token Implementation**: A fully-featured ERC-20 token (MockToken) with minting capabilities
- **Professional Staking Contract**: Time-based reward distribution with proportional allocation
- **Comprehensive Security Measures**: Reentrancy protection, input validation, and secure token transfers
- **Detailed Documentation**: Extensive NatSpec comments throughout the codebase
- **Complete Deployment Pipeline**: Scripts for deploying to Sepolia testnet with contract verification
- **Interactive Scripts**: Tools for staking, unstaking, and claiming rewards
- **Thorough Test Suite**: Comprehensive tests covering all contract functionality
- **Reward Calculation System**: Time-weighted rewards based on stake amount and duration

## Prerequisites

- Node.js (v14+)
- npm or yarn
- An Ethereum wallet with Sepolia ETH (for testnet deployment)
  - You can get Sepolia ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
- Alchemy or Infura API key (for testnet access)
  - Create a free account at [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
- Etherscan API key (for contract verification)
  - Register at [Etherscan](https://etherscan.io/register) to get an API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quantlink-basic-staking-poc.git
cd quantlink-basic-staking-poc
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
# Your Ethereum wallet private key (without 0x prefix)
# WARNING: Never share your private key and never commit this file to version control
PRIVATE_KEY=your_private_key_without_0x_prefix

# Your Alchemy or Infura API URL for Sepolia testnet
# Example: https://eth-sepolia.g.alchemy.com/v2/your-api-key
SEPOLIA_API_URL=your_alchemy_or_infura_api_url

# Your Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
```

4. Compile the contracts:
```bash
npx hardhat compile
```

5. Run tests to ensure everything is working:
```bash
npx hardhat test
```

## Smart Contracts

### MockToken

A simple ERC-20 token used for staking and rewards.

### StakingContract

The main staking contract that allows users to:
- Stake tokens
- Unstake tokens
- Earn rewards based on staking duration
- Claim accumulated rewards

## Usage

### Deploying Contracts

1. Deploy the MockToken:
```bash
npx hardhat run scripts/01-deploy-mock-token.js --network sepolia
```

2. Set the token address in your `.env` file:
```
TOKEN_ADDRESS=deployed_token_address
```

3. Deploy the StakingContract:
```bash
npx hardhat run scripts/02-deploy-staking-contract.js --network sepolia
```

4. Set the staking contract address in your `.env` file:
```
STAKING_CONTRACT_ADDRESS=deployed_staking_contract_address
```

### Interacting with Contracts

#### Approving Tokens for Staking
```bash
npx hardhat run scripts/03-approve-tokens.js --network sepolia
```
You can specify the amount to approve as a command-line argument:
```bash
npx hardhat run scripts/03-approve-tokens.js --network sepolia 500
```

#### Staking Tokens
```bash
npx hardhat run scripts/04-stake-tokens.js --network sepolia
```
You can specify the amount to stake as a command-line argument:
```bash
npx hardhat run scripts/04-stake-tokens.js --network sepolia 100
```

#### Unstaking Tokens
```bash
npx hardhat run scripts/05-unstake-tokens.js --network sepolia
```
You can specify the amount to unstake as a command-line argument:
```bash
npx hardhat run scripts/05-unstake-tokens.js --network sepolia 50
```

#### Checking Rewards
```bash
npx hardhat run scripts/06-check-rewards.js --network sepolia
```

#### Claiming Rewards
```bash
npx hardhat run scripts/07-claim-rewards.js --network sepolia
```

## Testing

Run the test suite:
```bash
npx hardhat test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
