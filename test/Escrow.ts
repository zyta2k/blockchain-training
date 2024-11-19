import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Escrow", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const [owner, claimer] = await hre.ethers.getSigners();
    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(claimer.address);

    return { escrow, owner, claimer };
  }

  it("Should deposit", async function () {
    const { escrow, owner, claimer } = await loadFixture(
      deployOneYearLockFixture
    );

    await escrow.connect(owner).deposit({ value: 1000 });

    expect(await hre.ethers.provider.getBalance(escrow.address)).to.equal(1000);
  });
});
