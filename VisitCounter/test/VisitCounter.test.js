const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VisitCounter", function () {
  let visitCounter;
  let owner;

  this.beforeEach(async () => {
    const VisitCounter = await ethers.getContractFactory("VisitCounter");
    visitCounter = await VisitCounter.deploy();

    [owner] = await ethers.getSigners();


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
    const people = await visitCounter.getPeople(owner.address);

    expect(numVisits).to.equal(2);
    expect(people.messages.length).to.equal(2);
    
  });
});
