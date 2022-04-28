/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("./scripts/deploy.js");
require("./scripts/mint.js");
require("./scripts/transfer.js");
require("./scripts/token.js");
require("./scripts/convert.js");
require("@nomiclabs/hardhat-etherscan");

const { ALCHEMY_KEY, ROPSTEN_ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.6",
  defaultNetwork: "ropsten",
  networks: {
   hardhat: {},
   hupayx: {
     url: `http://3.36.51.103:8545`
   },
   rinkeby: {
     url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
     accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
   },
   ropsten: {
     url: `http://3.36.51.103:8545`,
     accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
   },
   ethereum: {
     chainId: 2022,
     url: `http://3.36.51.103:8545`,
     accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
   },
 },
 etherscan: {
   apiKey: ETHERSCAN_API_KEY,
 },
}