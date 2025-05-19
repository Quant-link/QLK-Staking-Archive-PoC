// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title StakingContract
 * @dev A simple staking contract that allows users to stake ERC20 tokens and earn rewards
 */
contract StakingContract is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // The token being staked
    IERC20 public stakingToken;
    
    // Reward rate per second (in tokens)
    uint256 public rewardRate;
    
    // Last time the rewards were updated
    uint256 public lastUpdateTime;
    
    // Reward per token stored
    uint256 public rewardPerTokenStored;
    
    // User reward per token paid
    mapping(address => uint256) public userRewardPerTokenPaid;
    
    // User rewards
    mapping(address => uint256) public rewards;
    
    // Total staked amount
    uint256 public totalStaked;
    
    // Staked balance of each user
    mapping(address => uint256) public stakedBalances;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);

    /**
     * @dev Constructor
     * @param _stakingToken The token that will be staked
     * @param _rewardRate Initial reward rate per second
     */
    constructor(IERC20 _stakingToken, uint256 _rewardRate) Ownable(msg.sender) {
        stakingToken = _stakingToken;
        rewardRate = _rewardRate;
        lastUpdateTime = block.timestamp;
    }

    /**
     * @dev Update the reward variables
     */
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    /**
     * @dev Calculate the reward per token
     * @return The reward per token
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        
        return rewardPerTokenStored + (
            ((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalStaked
        );
    }

    /**
     * @dev Calculate the earned rewards for an account
     * @param account The address to calculate rewards for
     * @return The amount of rewards earned
     */
    function earned(address account) public view returns (uint256) {
        return (
            (stakedBalances[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18
        ) + rewards[account];
    }

    /**
     * @dev Stake tokens
     * @param amount The amount to stake
     */
    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        
        totalStaked += amount;
        stakedBalances[msg.sender] += amount;
        
        // Transfer tokens from sender to this contract
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        
        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Unstake tokens
     * @param amount The amount to unstake
     */
    function unstake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot unstake 0");
        require(stakedBalances[msg.sender] >= amount, "Not enough staked tokens");
        
        totalStaked -= amount;
        stakedBalances[msg.sender] -= amount;
        
        // Transfer tokens back to sender
        stakingToken.safeTransfer(msg.sender, amount);
        
        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Claim rewards
     */
    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            stakingToken.safeTransfer(msg.sender, reward);
            emit RewardClaimed(msg.sender, reward);
        }
    }

    /**
     * @dev Set the reward rate (only owner)
     * @param _rewardRate New reward rate per second
     */
    function setRewardRate(uint256 _rewardRate) external onlyOwner updateReward(address(0)) {
        rewardRate = _rewardRate;
        emit RewardRateUpdated(_rewardRate);
    }

    /**
     * @dev Get the staked balance of an account
     * @param account The address to check
     * @return The staked balance
     */
    function getStakedBalance(address account) external view returns (uint256) {
        return stakedBalances[account];
    }

    /**
     * @dev Get the total staked amount
     * @return The total staked amount
     */
    function getTotalStaked() external view returns (uint256) {
        return totalStaked;
    }
}
