import React from "react";

export default ({ daiBalance, zkDaiBalance }) => {
  return (
    <>
      Your DAI balance: {daiBalance} <br />
      Your zkDAI balance: {zkDaiBalance}
    </>
  );
};
