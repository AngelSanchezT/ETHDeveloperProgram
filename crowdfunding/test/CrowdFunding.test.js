const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding", function () {
  let crowdFunding;
  let owner;

  beforeEach(async () => {
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFunding.deploy(
      "1",
      "Project Name",
      "Project Description",
      ethers.utils.parseEther("100")
    );
    await crowdFunding.deployed();

    [owner] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the correct values", async () => {
      expect(await crowdFunding.id()).to.equal("1");
      expect(await crowdFunding.name()).to.equal("Project Name");
      expect(await crowdFunding.description()).to.equal("Project Description");
      expect(await crowdFunding.fundraisingGoal()).to.equal(
        ethers.utils.parseEther("100")
      );
      expect(await crowdFunding.author()).to.equal(owner.address);
      expect(await crowdFunding.state()).to.equal("Opened");
    });
  });

  describe("fundProject", () => {
    it("Should add funds to the contract and transfer them to the author", async () => {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const initialFunds = await crowdFunding.funds();
      const value = ethers.utils.parseEther("1");

      const authorBalanceInit = await ethers.provider.getBalance(owner.address);
      const userBalanceInit = await ethers.provider.getBalance(user.address);

      await crowdFunding.connect(user).fundProject({ value });

      // Aquí se guarda el valor actual de los fondos del contrato en la variable newFunds.
      const newFunds = await crowdFunding.funds();

      // Aquí se obtiene el saldo actual del autor del contrato.
      const authorBalance = await ethers.provider.getBalance(owner.address);
      const userBalance = await ethers.provider.getBalance(user.address);

      console.log("authorBalanceInit", authorBalanceInit);
      console.log("authorBalance", authorBalance);
      console.log("userBalanceInit", userBalanceInit);
      console.log("userBalance", userBalance);

      // Se espera que los nuevos fondes sean igual a
      expect(newFunds).to.equal(initialFunds.add(value));

      //  Se espera que el balance inicial de la billetera no sea igual al final
      expect(authorBalance).not.to.equal(authorBalanceInit);

      //  Se espera que el balance inicial de la billetera no sea igual al final
      expect(userBalance).not.to.equal(userBalanceInit);
    });

    it("should revert when owner tries to fund project", async function () {
      // Obtener la dirección del autor
      const [author] = await ethers.getSigners();

      // Intentar contribuir al proyecto
      await expect(
        crowdFunding.connect(author).fundProject({
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("As author you can not fund your own project");
    });
  });

  describe("changeProjectState", () => {
    it("Should change the project state", async () => {
      const newState = "Closed";

      await crowdFunding.connect(owner).changeProjectState(newState);

      expect(await crowdFunding.state()).to.equal(newState);
    });

    it("should allow owner to change project state", async function () {
      await crowdFunding.connect(owner).changeProjectState("Closed");
      expect(await crowdFunding.state()).to.equal("Closed");
    });

    it("should revert when not owner tries to change project state", async function () {
      const [, notOwner] = await ethers.getSigners();
      await expect(
        crowdFunding.connect(notOwner).changeProjectState("Closed")
      ).to.be.revertedWith(
        "You need to be the project author"
      );
    });
  });
});
