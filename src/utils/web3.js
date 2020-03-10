const Web3 = require("web3");

const extractWeb3 = async (resolve, reject) => {
  // modern dapp browsers
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // request account access if needed
      await window.ethereum.enable();
      // acccounts now exposed
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  }
  // legacy dapp browsers
  else if (window.web3) {
    // use Mist/MetaMask's provider
    const web3 = window.web3;
    resolve(web3);
  }
  // fallback to localhost; use dev console port by default
  else {
    const provider = new Web3.providers.WebsocketProvider(
      "ws://localhost:7545"
    );
    const web3 = new Web3(provider);
    resolve(web3);
  }
};

export default () => {
  return new Promise(async (resolve, reject) => {
    if (document.readyState === "complete") {
      // if the page has already loaded with all the resources
      await extractWeb3(resolve, reject);
    } else {
      // wait for loading completion to avoid race conditions with web3 injection timing
      window.addEventListener("load", async () => {
        await extractWeb3(resolve, reject);
      });
    }
  });
};
