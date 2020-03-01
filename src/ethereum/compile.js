#!/usr/bin/env node
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const privateEscrowPath = path.resolve(
  __dirname,
  "contracts",
  "PrivateEscrow.sol"
);

const privateEscrow = fs.readFileSync(privateEscrowPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "PrivateEscrow.sol": {
      content: privateEscrow
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts;

fs.ensureDirSync(buildPath);

for (let contract in contracts) {
  let contractName = contract.replace(".sol", "");
  fs.outputJsonSync(
    path.resolve(buildPath, contractName + ".json"),
    contracts[contract][contractName]
  );
}
