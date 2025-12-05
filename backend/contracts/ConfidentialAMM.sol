// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FHE, euint64} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @dev Minimal interface for our confidential tokens (demo only).
interface IConfidentialToken {
    // In real fhEVM tokens this would take encrypted values,
    // here it's just a placeholder for wiring later.
    function transfer(address to, uint64 amount) external returns (bool);
}

/// @title ConfidentialAMM
/// @notice Simplified AMM that keeps its reserves as encrypted euint64 values.
/// @dev No ERC7984 inheritance here. This is just pool logic operating on FHE types.
contract ConfidentialAMM is ZamaEthereumConfig, Ownable2Step {
    IConfidentialToken public immutable tokenA;
    IConfidentialToken public immutable tokenB;

    // Encrypted reserves of tokenA and tokenB in the pool
    euint64 public encryptedReserveA;
    euint64 public encryptedReserveB;

    event LiquidityAdded(
        address indexed provider,
        uint64 amountAPlain,
        uint64 amountBPlain,
        euint64 encryptedReserveA,
        euint64 encryptedReserveB
    );

    event SwapEncrypted(
        address indexed trader,
        address indexed tokenIn,
        address indexed tokenOut,
        euint64 encryptedAmountIn,
        euint64 encryptedAmountOut
    );

    constructor(address _owner, address _tokenA, address _tokenB)
        Ownable(_owner) // pass initial owner to Ownable (inherited by Ownable2Step)
    {
        tokenA = IConfidentialToken(_tokenA);
        tokenB = IConfidentialToken(_tokenB);

        // start with 0 encrypted reserves
        encryptedReserveA = FHE.asEuint64(0);
        encryptedReserveB = FHE.asEuint64(0);
    }

    /// @notice Add liquidity using plain amounts, encrypted on-chain for the demo.
    /// @dev In real fhEVM usage, frontend would send ciphertext and contract would
    ///      work entirely over encrypted data. Here we show FHE.add usage.
    function addLiquidity(uint64 amountAPlain, uint64 amountBPlain) external onlyOwner {
        euint64 encA = FHE.asEuint64(amountAPlain);
        euint64 encB = FHE.asEuint64(amountBPlain);

        encryptedReserveA = FHE.add(encryptedReserveA, encA);
        encryptedReserveB = FHE.add(encryptedReserveB, encB);

        emit LiquidityAdded(msg.sender, amountAPlain, amountBPlain, encryptedReserveA, encryptedReserveB);
    }

    /// @notice Swap between tokenA and tokenB with 1:1 pricing (demo only).
    /// @param amountInPlain Plain amount (for now), encrypted inside the contract.
    /// @param tokenInIsA true = swap A -> B, false = swap B -> A
    function swap(uint64 amountInPlain, bool tokenInIsA) external {
        require(amountInPlain > 0, "Amount must be > 0");

        euint64 encIn = FHE.asEuint64(amountInPlain);
        euint64 encOut = encIn; // demo: 1:1 rate

        if (tokenInIsA) {
            // trader gives A, receives B
            encryptedReserveA = FHE.add(encryptedReserveA, encIn);
            encryptedReserveB = FHE.sub(encryptedReserveB, encOut);

            emit SwapEncrypted(
                msg.sender,
                address(tokenA),
                address(tokenB),
                encIn,
                encOut
            );
        } else {
            // trader gives B, receives A
            encryptedReserveB = FHE.add(encryptedReserveB, encIn);
            encryptedReserveA = FHE.sub(encryptedReserveA, encOut);

            emit SwapEncrypted(
                msg.sender,
                address(tokenB),
                address(tokenA),
                encIn,
                encOut
            );
        }

        // NOTE:
        // - We are not doing actual token.transfer calls here yet.
        // - In the real CipherSwap implementation, this AMM will be wired
        //   to encrypted ERC7984 tokens and front-end encrypted inputs.
    }
}
