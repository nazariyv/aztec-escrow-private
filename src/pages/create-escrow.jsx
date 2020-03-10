import React, { useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Label2, Paragraph2 } from "baseui/typography";
import { Button } from "baseui/button";

export default ({ web3 }) => {
  const [receiver, setReceiver] = useState("");
  const [isValidReceiver, setIsValidReceiver] = useState(null);
  const [receiverVisited, setReceiverVisited] = useState(false);

  const shouldShowReceiverError = receiverVisited && !isValidReceiver;

  const onReceiverChange = e => {
    setReceiver(e.target.value);
    setIsValidReceiver(web3 ? web3.utils.isAddress(e.target.value) : null);
  };

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
          receiver === ""
            ? "Address of the receiver of the escrow after the conditions of escrow are met and all parties approve"
            : null
        }
        error={() =>
          shouldShowReceiverError
            ? "invalid ethereum address, check its correctness"
            : null
        }
      >
        <Input
          placeholder="0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA"
          value={receiver}
          error={shouldShowReceiverError}
          positive={receiverVisited && isValidReceiver}
          onChange={onReceiverChange}
          onBlur={() => setReceiverVisited(true)}
        />
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
