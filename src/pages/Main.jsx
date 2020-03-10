import React from "react";
import { Spinner } from "baseui/spinner";
import { Input, SIZE } from "baseui/input";
import { Block } from "baseui/block";
import { Label2, Paragraph2 } from "baseui/typography";
import { FormControl } from "baseui/form-control";

import Centered from "../components/centered";

export default ({ daiBalance, zkDaiBalance, isFetching }) => {
  if (isFetching)
    return (
      <Centered>
        <Spinner />
      </Centered>
    );

  return (
    <>
      <>
        <Label2>Your balances</Label2>
        <Paragraph2>
          Your DAI balance is publicly visible, zkDAI (zk stands for
          zero-knowledge) is the balance of DAI that is private
        </Paragraph2>
      </>
      <Block
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Block>
          <FormControl label={() => "DAI balance"}>
            <Input
              value={daiBalance}
              disabled
              size={SIZE.default}
              endEnhancer="DAI"
            />
          </FormControl>
        </Block>
        <Block>
          <FormControl label={() => "zkDAI balance"}>
            <Input
              value={zkDaiBalance}
              disabled
              size={SIZE.default}
              startEnhancer="zk"
              endEnhancer="DAI"
            />
          </FormControl>
        </Block>
      </Block>
    </>
  );
};
