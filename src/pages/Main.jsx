import React from "react";
import { Spinner } from "baseui/spinner";
import { Input, SIZE } from "baseui/input";
import { Block } from "baseui/block";

import Centered from "../components/centered";
import Text from "../components/text";

export default ({ daiBalance, zkDaiBalance, isFetching }) => {
  if (isFetching)
    return (
      <Centered>
        <Spinner />
      </Centered>
    );

  return (
    <>
      <Block>
        <Text style={{ fontSize: "14px" }}>Your DAI balance</Text>
        <Input value={daiBalance} disabled size={SIZE.default} />
      </Block>
      <Block>
        <Text style={{ fontSize: "14px" }}>Your zkDAI balance</Text>
        <Input
          value={zkDaiBalance}
          disabled
          size={SIZE.default}
          startEnhancer="zk"
        />
      </Block>
    </>
  );
};
