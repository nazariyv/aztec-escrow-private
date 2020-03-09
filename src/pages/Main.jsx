import React, { useState, useEffect, useCallback } from "react";

import getWeb3 from "../utils/web3";

const zkAssetAddress = "0x54Fac13e652702a733464bbcB0Fb403F1c057E1b";

export default () => {
  const [account, setAccount] = useState(null);
  const [zkAsset, setZkAsset] = useState();
  const [daiBalance, setDaiBalance] = useState(0);
  const [zkDaiBalance, setZkdaiBalance] = useState(0);

  const getBalances = async asset => {
    const publicBalance = await asset.balanceOfLinkedToken(account);
    const zkBalance = await asset.balance();
    setDaiBalance(publicBalance.toString(10));
    setZkdaiBalance(zkBalance);
  };

  useEffect(() => {
    const onDidMount = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const asset = await window.aztec.zkAsset(zkAssetAddress);
      setZkAsset(asset);
      await getBalances(asset);
    };
    onDidMount();
  }, []);

  return (
    <>
      Your DAI balance: {daiBalance} <br />
      Your zkDAI balance: {zkDaiBalance}
    </>
  );
};
