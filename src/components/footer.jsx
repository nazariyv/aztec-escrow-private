import React from "react";
import { Block } from "baseui/block";

import Text from "./text";

export default () => {
  return (
    <Block display="flex" flexDirection="row">
      <Text style={{ fontSize: "8px" }}>
        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/vitaly-gorbachev"
            title="Vitaly Gorbachev"
          >
            Vitaly Gorbachev
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </Text>
    </Block>
  );
};
