require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config();

const firstAccountPrivateKey = process.env.PRIVATE_KEY_1;
const secondAccountPrivateKey = process.env.PRIVATE_KEY_2;

// 10,000 ETH a su equivalente en wei. 
const balanceInit = "10000000000000000000000";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: firstAccountPrivateKey,
          balance: balanceInit,
        },
        {
          privateKey: secondAccountPrivateKey,
          balance: balanceInit,
        },
      ],
    },
  },
};
