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

### MockToken (`contracts/MockToken.sol`)

A professional ERC-20 token implementation used for staking and rewards.

**Key Features:**
- Standard ERC-20 functionality (transfer, approve, transferFrom)
- 18 decimal places for high precision
- Minting capability restricted to the contract owner
- Comprehensive input validation
- Detailed NatSpec documentation

**Constructor Parameters:**
- `name`: The name of the token (e.g., "Quantlink Token")
- `symbol`: The symbol of the token (e.g., "QNTL")
- `initialSupply`: The initial supply of tokens to mint to the deployer

**Key Functions:**
- `mint(address to, uint256 amount)`: Creates new tokens and assigns them to the specified address
- Standard ERC-20 functions: `transfer`, `approve`, `transferFrom`, `balanceOf`, etc.

### StakingContract (`contracts/StakingContract.sol`)

A sophisticated staking contract that implements a time-based reward distribution system.

**Key Features:**
- Secure token staking and unstaking
- Time-weighted reward calculation
- Proportional reward distribution based on stake amount
- Reentrancy protection for all state-changing functions
- Comprehensive input validation
- Detailed NatSpec documentation

**Constructor Parameters:**
- `_stakingToken`: The ERC-20 token that will be staked and used for rewards
- `_rewardRate`: Initial reward rate per second (in tokens, with 18 decimal precision)

**Key Functions:**
- `stake(uint256 amount)`: Allows users to stake tokens
- `unstake(uint256 amount)`: Allows users to unstake tokens
- `claimReward()`: Allows users to claim accumulated rewards
- `earned(address account)`: Calculates the rewards earned by an account
- `getEstimatedDailyRewards(address account)`: Estimates daily rewards for an account
- `setRewardRate(uint256 _rewardRate)`: Allows the owner to update the reward rate

**Reward Calculation:**
The contract uses a sophisticated reward calculation formula that:
1. Tracks the time elapsed since the last update
2. Calculates rewards based on the user's proportion of the total staked amount
3. Accumulates rewards over time, allowing users to claim at any point

## Usage

### Deployment Workflow

#### 1. Deploy to Sepolia Testnet

Follow these steps to deploy the contracts to the Sepolia testnet:

1. **Deploy the MockToken**:
```bash
npx hardhat run scripts/01-deploy-mock-token.js --network sepolia
```
This will:
- Deploy the MockToken contract to Sepolia
- Mint the initial supply to your wallet
- Verify the contract on Etherscan (if API key is provided)
- Output the deployed contract address

2. **Set the token address in your `.env` file**:
```
TOKEN_ADDRESS=deployed_token_address
```

3. **Deploy the StakingContract**:
```bash
npx hardhat run scripts/02-deploy-staking-contract.js --network sepolia
```
This will:
- Deploy the StakingContract with your MockToken as the staking token
- Set the initial reward rate
- Verify the contract on Etherscan (if API key is provided)
- Output the deployed contract address

4. **Set the staking contract address in your `.env` file**:
```
STAKING_CONTRACT_ADDRESS=deployed_staking_contract_address
```

5. **Fund the staking contract with reward tokens**:
You'll need to transfer some tokens to the staking contract to be used as rewards. You can do this using a wallet like MetaMask or by creating a custom script.

#### 2. Local Development and Testing

For local development and testing, you can use the provided setup script:

```bash
# Start a local Hardhat node in one terminal
npx hardhat node

# In another terminal, run the setup script
npx hardhat run scripts/setup-env.js --network localhost
```

This will:
- Deploy both contracts to your local Hardhat network
- Set up the necessary environment variables in `.env.local`
- Fund the staking contract with tokens for rewards

### Interacting with Contracts

The project includes several scripts to interact with the deployed contracts:

#### Approving Tokens for Staking
Before staking, you need to approve the StakingContract to spend your tokens:

```bash
# Approve the default amount (1000 tokens)
npx hardhat run scripts/03-approve-tokens.js --network sepolia

# Or specify a custom amount
npx hardhat run scripts/03-approve-tokens.js --network sepolia 500
```

#### Staking Tokens
After approval, you can stake your tokens:

```bash
# Stake the default amount (100 tokens)
npx hardhat run scripts/04-stake-tokens.js --network sepolia

# Or specify a custom amount
npx hardhat run scripts/04-stake-tokens.js --network sepolia 100
```

#### Unstaking Tokens
To withdraw your staked tokens:

```bash
# Unstake the default amount (50 tokens)
npx hardhat run scripts/05-unstake-tokens.js --network sepolia

# Or specify a custom amount
npx hardhat run scripts/05-unstake-tokens.js --network sepolia 50
```

#### Checking Rewards
To check your earned rewards:

```bash
npx hardhat run scripts/06-check-rewards.js --network sepolia
```

This will show:
- Your current staked balance
- Your earned rewards
- The current reward rate
- Estimated daily rewards

#### Claiming Rewards
To claim your accumulated rewards:

```bash
npx hardhat run scripts/07-claim-rewards.js --network sepolia
```

### Using npm Scripts

For convenience, the project includes npm scripts for common operations:

```bash
# Run tests
npm test

# Start a local node
npm run node

# Set up local environment
npm run setup-local

# Deploy token to the selected network
npm run deploy-token -- --network sepolia

# Deploy staking contract to the selected network
npm run deploy-staking -- --network sepolia

# Approve tokens
npm run approve -- --network sepolia

# Stake tokens
npm run stake -- --network sepolia

# Unstake tokens
npm run unstake -- --network sepolia

# Check rewards
npm run check-rewards -- --network sepolia

# Claim rewards
npm run claim-rewards -- --network sepolia
```

## Testing

The project includes a comprehensive test suite that covers all contract functionality:

```bash
# Run all tests
npx hardhat test

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test
```

The test suite includes tests for:
- Contract deployment and initialization
- Staking functionality
- Unstaking functionality
- Reward calculation and distribution
- Error handling and edge cases

## Contract Architecture

The staking system follows a simple but effective architecture:

```
User
 │
 ├── Approves tokens ──────┐
 │                         │
 │                         ▼
 │                  ┌─────────────┐
 │                  │  MockToken  │
 │                  └─────────────┘
 │                         │
 │                         │ Transfers tokens
 │                         │
 │                         ▼
 ├── Stakes/Unstakes ─► ┌─────────────────┐
 │                      │ StakingContract │
 │                      └─────────────────┘
 │                         │
 └── Claims rewards ◄──────┘
```

## Security Considerations

The contracts implement several security best practices:

1. **Reentrancy Protection**: All state-changing functions use the `nonReentrant` modifier
2. **Safe Token Transfers**: Uses OpenZeppelin's `SafeERC20` for all token operations
3. **Input Validation**: Comprehensive validation of all function inputs
4. **Access Control**: Owner-restricted functions for sensitive operations
5. **State Updates Before Transfers**: Updates state variables before external calls
6. **Event Emission**: Events for all important state changes

## Future Enhancements

Potential enhancements for a production version:

1. **Time-Locked Staking**: Add minimum staking periods with higher rewards
2. **Staking Tiers**: Different reward rates based on amount staked
3. **Governance Integration**: Allow token holders to vote on reward rates
4. **Multi-Token Support**: Allow staking of multiple token types
5. **Reward Boosting**: NFT-based or time-based reward multipliers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [OpenZeppelin](https://openzeppelin.com/) for secure contract libraries
- [Hardhat](https://hardhat.org/) for the Ethereum development environment
- [Ethers.js](https://docs.ethers.io/) for the Ethereum JavaScript API
