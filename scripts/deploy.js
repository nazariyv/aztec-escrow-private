// This script uses @nomiclabs/buidler-truffle5
// eslint-disable-next-line
const PrivateEscrow = artifacts.require("PrivateEscrow");

async function main() {
  const privateEscrow = await PrivateEscrow.new("Hello, world!");
  console.log("Private escrow address:", privateEscrow.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
