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
      const initialFunds = await crowdFunding.funds();
      const value = ethers.utils.parseEther("1");
      
      const authorBalanceInit = await ethers.provider.getBalance(owner.address);

      await crowdFunding.connect(owner).fundProject({ value });

      // Aquí se guarda el valor actual de los fondos del contrato en la variable newFunds.
      const newFunds = await crowdFunding.funds();
      
      // Aquí se obtiene el saldo actual del autor del contrato.
      const authorBalance = await ethers.provider.getBalance(owner.address);
      
      // Se espera que los nuevos fondes sean igual a 
      expect(newFunds).to.equal(initialFunds.add(value));
      
      //  Se espera que el balance inicial de la billetera no sea igual al final
      expect(authorBalance).not.to.equal(authorBalanceInit);
    });
  });

  describe("changeProjectState", () => {
    it("Should change the project state", async () => {
      const newState = "Closed";

      await crowdFunding.connect(owner).changeProjectState(newState);

      expect(await crowdFunding.state()).to.equal(newState);
    });
  });
});
