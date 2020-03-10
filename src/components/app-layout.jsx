import React from "react";
import Header from "./header";
import { Block } from "baseui/block";

import SideNavigation from "./side-navigation";
import Footer from "./footer";

export default ({ children }) => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      minWidth="900px"
      height="100vh"
    >
      <Block>
        <Header />
      </Block>
      <Block display="flex" flexDirection="row">
        <Block width="180px">
          <SideNavigation />
        </Block>
        <Block flex="auto">{children}</Block>
      </Block>
      <Block marginTop="auto" paddingBottom="20px">
        <Footer />
      </Block>
    </Block>
  );
};
