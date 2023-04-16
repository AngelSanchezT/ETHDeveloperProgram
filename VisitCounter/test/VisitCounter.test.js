const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VisitCounter", function () {
  let visitCounter;

  this.beforeEach(async () => {
    const VisitCounter = await ethers.getContractFactory("VisitCounter");
    visitCounter = await VisitCounter.deploy();
  });

  it("Registrar una visita", async function () {
    await visitCounter.visit("Hello, First Message");
    const numVisits = await visitCounter.getTotalVisits();
    expect(numVisits).to.equal(1);
  });
  
  it("Registrar dos visitas", async function () {
    await visitCounter.visit("Hello, First Message");
    await visitCounter.visit("Hello, Seconds Message");
    const numVisits = await visitCounter.getTotalVisits();
    expect(numVisits).to.equal(2);
  });
});
