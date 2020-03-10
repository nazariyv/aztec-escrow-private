import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import howItWorksMD from "../docs/how-it-works.md";
import "github-markdown-css";

export default () => {
  const [howItWorks, setHowItWorks] = useState("");

  useEffect(() => {
    fetch(howItWorksMD)
      .then(response => response.text())
      .then(text => setHowItWorks(text));
  });

  return (
    <div className="markdown-body">
      <ReactMarkdown source={howItWorks} />
    </div>
  );
};
