#!/bin/bash

# Make the script executable
chmod +x scripts/run-local-node.sh

# Start a local Hardhat node
echo "Starting local Hardhat node..."
npx hardhat node
