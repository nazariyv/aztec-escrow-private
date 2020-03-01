import React from "react";
import ToolLayoutBaseUI from "../components/ToolLayoutBaseUI";
import SideNavigation from "../components/SideNavigation";
import { Block } from "baseui/block";

const loadAztec = () => {
  let scriptElement = document.querySelector("script");
  let head = document.querySelector("head");

  return new Promise((resolve, reject) => {
    scriptElement.src = "https://sdk.aztecprotocol.com/aztec.js";
    scriptElement.onload = e => resolve(e);
    scriptElement.onerror = e => reject(e);
    head.appendChild(scriptElement);
  });
};

class Main extends React.Component {
  componentDidMount = async () => {
    console.log("aztec loading initiated");
    await loadAztec();
    console.log("aztec loaded");
  };

  render = () => (
    <ToolLayoutBaseUI>
      {/* <Script
        url="https://sdk.aztecprotocol.com/aztec.js"
        onError={() => console.log("could not load aztec")}
        onLoad={() => console.log("aztec loaded")}
      /> */}
      <Block display="flex" alignItems="left" width="180px">
        <SideNavigation />
      </Block>
    </ToolLayoutBaseUI>
  );
}

export default Main;
