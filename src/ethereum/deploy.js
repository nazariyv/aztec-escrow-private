#!/usr/bin/env node
const privateEscrow = require("./build/PrivateEscrow.json");
const web3 = require("./web3");

// truffle-hdwallet-provider@0.0.3
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(privateEscrow.abi)
    .deploy({ data: privateEscrow.evm.bytecode.object })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
