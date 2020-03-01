import React from "react";
import Header from "./Header";
import { Block } from "baseui/block";

export default ({ children }) => {
  return (
    <Block
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      minWidth="1000px"
    >
      <Header />
      {/* <ToolHead title={title} onMenuClick={onMenuClick} /> */}
      {/* <ToolMenu isOpen={isMenuOpen} onCloseClick={onCloseClick} /> */}
      <Block display="flex" flexDirection="column" flex="grow">
        {children}
      </Block>
      {/* <Footer /> */}
    </Block>
  );
};
