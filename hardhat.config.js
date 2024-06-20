
/* global ethers task */
require('@nomiclabs/hardhat-waffle')
//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks:{
    sepolia: {
      url:`https://eth-sepolia.g.alchemy.com/v2/Af6daGPIu82mzt2qbc5RLcnFUXIDgpc4`,
      accounts:[process.env.PRIVATE_KEY]
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: `73F5A1QSPD7WDFXF39IB3F13NTDCZ16V5Y`,
      bscTestnet: `H3IGAS32JCEX43RNVT32HDM1YNYECQBJZW`
    }
  }
}
