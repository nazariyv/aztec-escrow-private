import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";

import Text from "../components/text";

import howItWorksMD from "../static/docs/how-it-works.md";

import aztecERC20Get1 from "../static/img/aztec-erc20-get-1.png";
import aztecERC20Get2 from "../static/img/aztec-erc20-get-2.png";
import aztecERC20Get3 from "../static/img/aztec-erc20-get-3.png";
import aztecZkDAIGet1 from "../static/img/aztec-zkdai-get-1.png";
import aztecZkDAIGet2 from "../static/img/aztec-zkdai-get-2.png";

const IMAGE_PATHS = {
  "aztec-erc20-get-1": aztecERC20Get1,
  "aztec-erc20-get-2": aztecERC20Get2,
  "aztec-erc20-get-3": aztecERC20Get3,
  "aztec-zkdai-get-1": aztecZkDAIGet1,
  "aztec-zkdai-get-2": aztecZkDAIGet2
};

const insertImageLinks = text => {
  Object.keys(IMAGE_PATHS).forEach(k => {
    text = text.replace(k, IMAGE_PATHS[k]);
  });
  return text;
};

export default () => {
  const [howItWorks, setHowItWorks] = useState("");

  useEffect(() => {
    fetch(howItWorksMD)
      .then(response => response.text())
      .then(text => {
        setHowItWorks(insertImageLinks(text));
      });
  });

  return (
    <>
      <div className="markdown-body">
        <ReactMarkdown source={howItWorks} />
      </div>
      <hr />
      <Text style={{ fontSize: "10px" }}>
        Last-Modified: Tue, 10 Mar 2020 21:21:21 GMT
        <br />
        Author: Nazariy Vavryk, nazariy@inbox.ru
      </Text>
    </>
  );
};
