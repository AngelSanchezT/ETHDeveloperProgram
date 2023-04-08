const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding", function () {
  const OPENED = 0;
  const CLOSED = 1;
  let crowdFunding;
  let owner;
  let projects;

  beforeEach(async () => {
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");

    crowdFunding = await CrowdFunding.deploy();

    await crowdFunding.createProject(
      "1",
      "Project Name",
      "Project Description",
      ethers.utils.parseEther("100")
    );

    projects = await crowdFunding.getAllProjects();

    [owner] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the correct values", async () => {
      expect(projects[0].id).to.equal("1");
      expect(projects[0].name).to.equal("Project Name");
      expect(projects[0].description).to.equal("Project Description");
      expect(projects[0].fundraisingGoal).to.equal(
        ethers.utils.parseEther("100")
      );
      expect(projects[0].author).to.equal(owner.address);
      expect(projects[0].state).to.equal(OPENED);
    });
  });

  describe("fundProject", () => {
    it("Challenge 1 - Should add funds to the contract and transfer them to the author", async () => {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      let project = projects[0];
      const initialFunds = project.funds;
      const value = ethers.utils.parseEther("1");

      const authorBalanceInit = await ethers.provider.getBalance(owner.address);
      const userBalanceInit = await ethers.provider.getBalance(user.address);

      await crowdFunding.connect(user).fundProject(0, { value });

      // Aquí se guarda el valor actual de los fondos del contrato en la variable newFunds.
      project = await crowdFunding.projects(0);
      const newFunds = project.funds;

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
        crowdFunding.connect(author).fundProject(0, {
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("As author you can not fund your own project");
    });

    it("Challenge 3 - Should emitted event ProjectFunded", async function () {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const value = ethers.utils.parseEther("1");

      // Intentar contribuir al proyecto y evaluar el evento
      await expect(crowdFunding.connect(user).fundProject(0, { value }))
        .to.emit(crowdFunding, "ProjectFunded")
        .withArgs(projects[0].id, value);
    });

    it("Challenge 4 - Should revert transaction because the project can not receive funds", async function () {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const value = ethers.utils.parseEther("1");

      await crowdFunding.connect(owner).changeProjectState(0, CLOSED);

      // Intentar contribuir al proyecto y evaluar el evento
      await expect(
        crowdFunding.connect(user).fundProject(0, { value })
      ).to.be.revertedWith("The project can not receive funds");
    });

    it("Challenge 4 - Should revert transaction because the fund value must be greater than 0", async function () {
      // Obtener la dirección de un usuario que no es el autor
      const [, user] = await ethers.getSigners();
      const value = ethers.utils.parseEther("0");

      if (projects[0].state === CLOSED) {
        await crowdFunding.connect(owner).changeProjectState(0, OPENED);
      }

      // Intentar contribuir al proyecto y evaluar el evento
      await expect(
        crowdFunding.connect(user).fundProject(0, { value })
      ).to.be.revertedWith("Fund value must be greater than 0");
    });
  });

  describe("changeProjectState", () => {
    it("Challenge 1 - Should change the project state", async () => {
      await crowdFunding.connect(owner).changeProjectState(0, CLOSED);

      let project = await crowdFunding.projects(0);

      expect(project.state).to.equal(CLOSED);
    });

    it("Challenge 2 - should allow owner to change project state", async function () {
      await crowdFunding.connect(owner).changeProjectState(0, CLOSED);

      let project = await crowdFunding.projects(0);

      expect(project.state).to.equal(CLOSED);
    });

    it("Challenge 2 - should revert when not owner tries to change project state", async function () {
      const [, notOwner] = await ethers.getSigners();
      await expect(
        crowdFunding.connect(notOwner).changeProjectState(0, CLOSED)
      ).to.be.revertedWith("You need to be the project author");
    });

    it("Challenge 3 - should emitted event ProjectStateChanged", async function () {
      await expect(crowdFunding.connect(owner).changeProjectState(0, CLOSED))
        .to.emit(crowdFunding, "ProjectStateChanged")
        .withArgs(projects[0].id, CLOSED);
    });

    it("Challenge 4 - Should revert transaction because new state must be different", async function () {
      if (projects[0].state === OPENED) {
        await expect(
          crowdFunding.connect(owner).changeProjectState(0, OPENED)
        ).to.be.revertedWith("New state must be different");
      } else {
        await expect(
          crowdFunding.connect(owner).changeProjectState(0, CLOSED)
        ).to.be.revertedWith("New state must be different");
      }
    });

    it("Challenge 6 - Should revert transaction because new state no is valid", async function () {
      await expect(crowdFunding.connect(owner).changeProjectState(0, 2)).to.be
        .reverted;
    });
  });

  describe("createProject", () => {
    it("Challenge 7 - Should create other project", async function () {
      await crowdFunding.createProject(
        "2",
        "Proyecto Dos",
        "Descripción del Proyecto 2",
        ethers.utils.parseEther("100")
      );

      projects = await crowdFunding.getAllProjects();

      expect(projects.length).to.equal(2);
    });
  });
});
