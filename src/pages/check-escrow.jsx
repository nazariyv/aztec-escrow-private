import React from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Label2, Paragraph2 } from "baseui/typography";
import { Button } from "baseui/button";
import { Block } from "baseui/block";

export default () => {
  return (
    <>
      <>
        <Label2>Checking an escrow workflow</Label2>
        <Paragraph2>
          To check if the escrow exists, you need to supply the address of the
          sender and the id of the escrow
        </Paragraph2>
      </>
      <FormControl
        label={() => "Sender"}
        caption={() => "Address of the creator of the escrow"}
      >
        <Input placeholder="0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA" />
      </FormControl>
      <FormControl
        label={() => "Escrow ID"}
        caption={() =>
          "Unique identifier of the escrow, you get this after having succesfully created an escrow"
        }
      >
        <Input placeholder="0xc30ccb9e9fd902d290054620c3a978ea10d0facf92748fcd397e7184e0b07148" />
      </FormControl>
      <Button>Check escrow exists</Button>

      <Block marginTop="20px">
        <Label2>Check escrow's amount (proof-of-funds)</Label2>
        <Paragraph2>This uses the view permissions on the escrow</Paragraph2>
        <Button>Check value of escrow</Button>
      </Block>
    </>
  );
};
