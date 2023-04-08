const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding", function () {
  const OPENED = 0;
  const CLOSED = 1;
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
      expect(await crowdFunding.state()).to.equal(OPENED);
    });
  });

  describe("fundProject", () => {
    it("Challenge 1 - Should add funds to the contract and transfer them to the author", async () => {
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

      // console.log("authorBalanceInit", authorBalanceInit);
      // console.log("authorBalance", authorBalance);
      // console.log("userBalanceInit", userBalanceInit);
      // console.log("userBalance", userBalance);

      // Se espera que los nuevos fondes sean igual a
      expect(newFunds).to.equal(initialFunds.add(value));

      //  Se espera que el balance inicial de la billetera no sea igual al final
      expect(authorBalance).not.to.equal(authorBalanceInit);

      //  Se espera que el balance inicial de la billetera no sea igual al final
      expect(userBalance).not.to.equal(userBalanceInit);
    });

    it("Challenge 2 - should revert when owner tries to fund project", async function () {
      // Obtener la dirección del autor
      const [author] = await ethers.getSigners();

      // Intentar contribuir al proyecto
      await expect(
        crowdFunding.connect(author).fundProject({
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("As author you can not fund your own project");
    });

    it("Challenge 3 - Should emitted event ProjectFunded", async function () {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const value = ethers.utils.parseEther("1");

      // Intentar contribuir al proyecto y evaluar el evento
      await expect(crowdFunding.connect(user).fundProject({ value }))
        .to.emit(crowdFunding, "ProjectFunded")
        .withArgs(await crowdFunding.id(), value);
    });

    it("Challenge 4 - Should revert transaction because the project can not receive funds", async function () {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const value = ethers.utils.parseEther("1");

      await crowdFunding.connect(owner).changeProjectState(CLOSED);

      // Intentar contribuir al proyecto y evaluar el evento
      await expect(
        crowdFunding.connect(user).fundProject({ value })
      ).to.be.revertedWith("The project can not receive funds");
    });

    it("Challenge 4 - Should revert transaction because the fund value must be greater than 0", async function () {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const value = ethers.utils.parseEther("0");

      const stateInit = await crowdFunding.state();

      if (stateInit === CLOSED) {
        await crowdFunding.connect(owner).changeProjectState(OPENED);
      }

      // Intentar contribuir al proyecto y evaluar el evento
      await expect(
        crowdFunding.connect(user).fundProject({ value })
      ).to.be.revertedWith("Fund value must be greater than 0");
    });
  });

  describe("changeProjectState", () => {
    it("Challenge 1 - Should change the project state", async () => {
      await crowdFunding.connect(owner).changeProjectState(CLOSED);
      expect(await crowdFunding.state()).to.equal(CLOSED);
    });

    it("Challenge 2 - should allow owner to change project state", async function () {
      await crowdFunding.connect(owner).changeProjectState(CLOSED);
      expect(await crowdFunding.state()).to.equal(CLOSED);
    });

    it("Challenge 2 - should revert when not owner tries to change project state", async function () {
      const [, notOwner] = await ethers.getSigners();
      await expect(
        crowdFunding.connect(notOwner).changeProjectState(CLOSED)
      ).to.be.revertedWith("You need to be the project author");
    });

    it("Challenge 3 - should emitted event ProjectStateChanged", async function () {
      await expect(crowdFunding.connect(owner).changeProjectState(CLOSED))
        .to.emit(crowdFunding, "ProjectStateChanged")
        .withArgs(await crowdFunding.id(), await crowdFunding.state());
    });

    it("Challenge 4 - Should revert transaction because new state must be different", async function () {
      const state = await crowdFunding.state();

      if (state.toNumber() === OPENED) {
        await expect(
          crowdFunding.connect(owner).changeProjectState(OPENED)
        ).to.be.revertedWith("New state must be different");
      } else {
        await expect(
          crowdFunding.connect(owner).changeProjectState(CLOSED)
        ).to.be.revertedWith("New state must be different");
      }
    });
  });
});
