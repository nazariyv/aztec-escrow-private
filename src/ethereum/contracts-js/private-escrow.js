const PrivateEscrow = require("../build/PrivateEscrow.json.js.js.js");
const web3 = require("../web3");
const ADDRESS = "..."; // TODO: DEPLOY!

module.exports = {
  address: ADDRESS,
  contract: new web3.eth.Contract(PrivateEscrow.abi, ADDRESS)
};
