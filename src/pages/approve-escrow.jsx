import React, { useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Label2, Paragraph2 } from "baseui/typography";
import { Button } from "baseui/button";
import { Radio, RadioGroup, ALIGN } from "baseui/radio";

export default () => {
  const [whoAmI, setWhoAmI] = useState("sender");

  return (
    <>
      <>
        <Label2>Approve an escrow</Label2>
        <Paragraph2>
          To approve an escrow, you need to specify the unique ID of the escrow,
          as well as the address of either the receiver or the sender (depending
          on who you are)
        </Paragraph2>
      </>
      <FormControl label={() => "Are you sender or receiver?"}>
        <RadioGroup
          value={whoAmI}
          onChange={e => setWhoAmI(e.target.value)}
          name="number"
          align={ALIGN.vertical}
        >
          <Radio value="sender" description="you have created the escrow">
            Sender
          </Radio>
          <Radio
            value="receiver"
            description="you shall receive the escrow amount if terms are satisfied"
          >
            Receiver
          </Radio>
        </RadioGroup>
      </FormControl>
      {whoAmI === "sender" && (
        <FormControl
          label={() => "Receiver"}
          caption={() =>
            "Address of the receiver of the escrow after the conditions of escrow are met and all parties approve"
          }
        >
          <Input placeholder="0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA" />
        </FormControl>
      )}
      {whoAmI === "receiver" && (
        <FormControl
          label={() => "Sender"}
          caption={() =>
            "Address of the sender of the escrow after the conditions of escrow are met and all parties approve"
          }
        >
          <Input placeholder="0x51d6678aD99dd09F20zzz13aac99f5cA66cd5caa" />
        </FormControl>
      )}
      <Button>Approve</Button>
    </>
  );
};
