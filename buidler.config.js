/* eslint-disable */
usePlugin("@nomiclabs/buidler-truffle5");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await web3.eth.getAccounts();

  for (const account of accounts) {
    console.log(account);
  }
});

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/4a5295521e87487ea515d984c82d3a80",
      accounts: {
        mnemonic: ""
      }
    }
  }
};
