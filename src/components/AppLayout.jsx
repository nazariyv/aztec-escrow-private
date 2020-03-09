import React from "react";
import Header from "./Header";
import { Block } from "baseui/block";

import SideNavigation from "./SideNavigation";

export default ({ children }) => {
  return (
    <Block display="flex" flexDirection="column">
      <Block>
        <Header />
      </Block>
      <Block display="flex" flexDirection="row">
        <Block width="180px">
          <SideNavigation />
        </Block>
        <Block backgroundColor="cyan" flex="auto">
          {children ? children : "Aztec Private Escrow"}
        </Block>
      </Block>
      {/* <Block
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        minWidth="1000px"
      >
        <Block width="180px">
          <SideNavigation />
        </Block> */}
      {/* <Block display="flex" flexDirection="column" flex="grow">
          {children}
        </Block> */}
      {/* </Block> */}
    </Block>
  );
};
