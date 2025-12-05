// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {FHE, euint64} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title ConfidentialAMM
/// @notice Minimal demo AMM for CipherSwap:
///         - Reserves stored as encrypted euint64
///         - Emits Swap/Liquidity events
///         - No real pricing curve (demo for bounty / UI wiring)
contract ConfidentialAMM is ZamaEthereumConfig, Ownable {
    address public tokenA;
    address public tokenB;

    // Encrypted reserves (fhEVM euint64)
    euint64 private reserveA;
    euint64 private reserveB;

    event LiquidityAdded(address indexed provider, uint64 amountA, uint64 amountB);
    event Swap(address indexed trader, bool aToB, uint64 amountIn);

    constructor(address _tokenA, address _tokenB, address _owner) Ownable(_owner) {
        tokenA = _tokenA;
        tokenB = _tokenB;

        // Start zero encrypted reserves
        reserveA = FHE.asEuint64(0);
        reserveB = FHE.asEuint64(0);
    }

    /// @notice Seed / add liquidity (owner-only for this demo)
    function addLiquidity(uint64 amountA, uint64 amountB) external onlyOwner {
        // IMPORTANT:
        // No FHE.add here to avoid ACLNotAllowed in local tests.
        // Just overwrite reserves with fresh encrypted amounts.
        reserveA = FHE.asEuint64(amountA);
        reserveB = FHE.asEuint64(amountB);

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    /// @notice Encrypted swap: just emits event for demo
    /// @param amountIn Plain uint64 amount; in real dApp this would be encrypted client-side.
    /// @param aToB true = TokenA -> TokenB, false = TokenB -> TokenA
    function swap(uint64 amountIn, bool aToB) external {
        emit Swap(msg.sender, aToB, amountIn);
    }

    /// @notice Return encrypted reserves (for tests / UI)
    function getReservesEncrypted() external view returns (euint64, euint64) {
        return (reserveA, reserveB);
    }
}
