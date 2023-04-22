const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MiTokenFungible tests", function () {
  before(async function () {
    const availableSigners = await ethers.getSigners();
    this.deployer = availableSigners[0];

    const MyToken = await ethers.getContractFactory("MiTokenFungible");
    this.myToken = await MyToken.deploy();
    await this.myToken.deployed();
  });

  it("Should be named Mi Token Fungible", async function () {
    const fetchedTokenName = await this.myToken.name();
    expect(fetchedTokenName).to.be.equal("Mi Token Fungible");
  });

  it('Should have symbol "MTF"', async function () {
    const fetchedTokenSymbol = await this.myToken.symbol();
    expect(fetchedTokenSymbol).to.be.equal("MTF");
  });
});
