const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(
  "", // TODO: SEED HERE!
  "" // INFURA: RINKEBY / MAINNET
);

const web3 = new Web3(provider);

module.exports = web3;
