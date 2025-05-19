# Quantlink Basic Staking POC

A proof-of-concept for a simple staking smart contract on the Ethereum Sepolia Testnet. This project demonstrates basic on-chain interaction with a staking mechanism, including token deployment, staking, unstaking, and reward distribution.

## Overview

This project implements a basic staking system with the following features:

- ERC-20 token creation (MockToken)
- Staking contract with reward distribution
- Scripts for deploying contracts and interacting with them
- Comprehensive test suite

## Prerequisites

- Node.js (v14+)
- npm or yarn
- An Ethereum wallet with Sepolia ETH (for testnet deployment)
- Alchemy or Infura API key (for testnet access)

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
PRIVATE_KEY=your_private_key_without_0x_prefix
SEPOLIA_API_URL=your_alchemy_or_infura_api_url
ETHERSCAN_API_KEY=your_etherscan_api_key
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
