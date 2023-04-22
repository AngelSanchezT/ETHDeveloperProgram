const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("MyToken", function () {
  let myToken;
  let owner;
  let otherAccount;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
    otherAccount = signers.slice(1);

    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy();
  });

  it("should have correct name, symbol, and decimals", async () => {
    expect(await myToken.name()).to.equal("MyToken");
    expect(await myToken.symbol()).to.equal("MTK");
    expect(await myToken.decimals()).to.be.equal(ethers.BigNumber.from(18));
  });

  it("Should set the right owner", async function () {
    expect(await myToken.owner()).to.equal(owner.address);
  });

  it("should mint tokens", async () => {
    const amount = ethers.BigNumber.from(100);

    await myToken.connect(owner).mint(otherAccount[1].address, amount);

    expect(await myToken.balanceOf(otherAccount[1].address)).to.be.equal(
      amount
    );
  });

  it("should only allow owner to mint tokens", async () => {
    const amount = ethers.BigNumber.from(100);

    await expect(
      myToken.connect(otherAccount[1]).mint(otherAccount[1].address, amount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
