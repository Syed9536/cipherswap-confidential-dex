// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FHE, euint64} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {ERC7984} from "@openzeppelin/confidential-contracts/token/ERC7984/ERC7984.sol";

/// @title EncryptedERC20Base
/// @notice Generic confidential token using Zama fhEVM + OpenZeppelin ERC7984
/// @dev Balances & transfers use `euint64` (encrypted 64-bit integers)
contract EncryptedERC20Base is ZamaEthereumConfig, ERC7984, Ownable2Step {
    constructor(
        address owner,
        uint64 initialAmount,
        string memory name_,
        string memory symbol_,
        string memory tokenURI_
    ) ERC7984(name_, symbol_, tokenURI_) Ownable(owner) {
        // euint64 = encrypted uint64 (amount encrypted on-chain)
        euint64 encryptedAmount = FHE.asEuint64(initialAmount);
        _mint(owner, encryptedAmount);
    }
}

/// @title Private USDC (Confidential Stablecoin)
contract PrivateUSDC is EncryptedERC20Base {
    constructor(address owner)
        EncryptedERC20Base(
            owner,
            1_000_000,                        // initial encrypted supply
            "Private USDC",                   // name
            "pUSDC",                          // symbol
            "https://example.com/metadata/pusdc"
        )
    {}
}

/// @title Private ETH (Confidential ETH-like token)
contract PrivateETH is EncryptedERC20Base {
    constructor(address owner)
        EncryptedERC20Base(
            owner,
            500_000,                          // initial encrypted supply
            "Private Ether",                  // name
            "pETH",                           // symbol
            "https://example.com/metadata/peth"
        )
    {}
}
