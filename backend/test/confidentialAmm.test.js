const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConfidentialAMM (CipherSwap demo)", function () {
  let owner, alice, bob;
  let usdc, peth, amm;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();

    const USDC = await ethers.getContractFactory("PrivateUSDC");
    usdc = await USDC.deploy(owner.address);
    await usdc.waitForDeployment();

    const PETH = await ethers.getContractFactory("PrivateETH");
    peth = await PETH.deploy(owner.address);
    await peth.waitForDeployment();

    const AMM = await ethers.getContractFactory("ConfidentialAMM");
    amm = await AMM.deploy(
      await usdc.getAddress(),
      await peth.getAddress(),
      owner.address
    );
    await amm.waitForDeployment();

    await amm.connect(owner).addLiquidity(100_000, 50_000);
  });

  it("lets a user perform an encrypted swap A → B", async function () {
    const tx = await amm.connect(alice).swap(1_000, true);
    await expect(tx).to.emit(amm, "Swap");
  });

  it("stores pool reserves as encrypted euint64, not plain numbers", async function () {
    const reserves = await amm.getReservesEncrypted();
    const encA = reserves[0];
    const encB = reserves[1];

    // Encrypted values non-zero
    expect(encA).to.not.equal(0n);
    expect(encB).to.not.equal(0n);

    // And different from the plain inputs
    expect(encA).to.not.equal(100000n);
    expect(encB).to.not.equal(50000n);
  });
});
