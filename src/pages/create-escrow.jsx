import React from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Label2, Paragraph2 } from "baseui/typography";
import { Button } from "baseui/button";

export default () => {
  return (
    <>
      <>
        <Label2>Creating an escrow workflow</Label2>
        <Paragraph2>
          To create a private escrow you need to supply the receiver's address,
          as well as the amount of zkDAI you wish to lock up in the escrow
        </Paragraph2>
      </>
      <FormControl
        label={() => "Receiver"}
        caption={() =>
          "Address of the receiver of the escrow after the conditions of escrow are met and all parties approve"
        }
      >
        <Input placeholder="0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA" />
      </FormControl>
      <FormControl
        label={() => "Escrow zkDAI amount"}
        caption={() => "Amount of zkDAI you wish to lock up in escrow"}
      >
        <Input placeholder="20" />
      </FormControl>
      <Button>Create</Button>
    </>
  );
};
