import React from "react";
import { Block } from "baseui/block";

import Text from "./text";

import GitHubIco from "../static/img/github.ico";
import LinkedInIco from "../static/img/linkedin.ico";
import MediumIco from "../static/img/medium.ico";

export default () => {
  return (
    <Block
      display="flex"
      flexDirection="row"
      style={{ borderTopStyle: "solid" }}
      width="100%"
      justifyContent="space-between"
    >
      <Text style={{ fontSize: "8px" }}>
        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/vitaly-gorbachev"
            title="Vitaly Gorbachev"
            style={{ textDecoration: "none", color: "black" }}
          >
            Vitaly Gorbachev
          </a>
          {", "}
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
            style={{ textDecoration: "none", color: "black" }}
          >
            Pixel perfect
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            style={{ textDecoration: "none", color: "black" }}
          >
            www.flaticon.com
          </a>
        </div>
      </Text>
      <Block
        padding="5px"
        display="flex"
        flexDirection="row"
        minWidth="230px"
        justifyContent="space-around"
      >
        <Text style={{ fontSize: "8px" }}>
          Author: Nazariy Vavryk, nazariy@inbox.ru
        </Text>
        <a href="https://github.com/nazariyv">
          <img
            src={GitHubIco}
            alt="Nazariy Vavryk's GitHub"
            style={{ width: "15px", height: "15px" }}
          />
        </a>
        <a href="https://www.linkedin.com/in/nazariy-v-33906544/">
          <img
            src={LinkedInIco}
            alt="Nazariy Vavryk's LinkedIn"
            style={{ width: "15px", height: "15px" }}
          />
        </a>
        <a href="https://medium.com/@parzival.is.sweet">
          <img
            src={MediumIco}
            alt="Nazariy Vavryk's Medium"
            style={{ width: "15px", height: "15px" }}
          />
        </a>
      </Block>
    </Block>
  );
};
