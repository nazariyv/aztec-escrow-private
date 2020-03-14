import React, { useState } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Label2, Paragraph2 } from "baseui/typography";
import { Button } from "baseui/button";
import secp256k1 from "@aztec/secp256k1";
import { note, JoinSplitProof } from "aztec.js";

import {
  PRIVATE_ESCROW_ADDRESS,
  ZK_ASSET_ADDRESS,
  TEST_ACCOUNT_ADDRESS
} from "../consts";

const dummyPubKey = secp256k1.generateAccount().publicKey; // used for creating notes. ramifications not known. aztec does not respond on Discord / Telegram

export default ({ aztec, web3, zkBalance, zkAsset }) => {
  const [receiver, setReceiver] = useState("");
  const [isValidReceiver, setIsValidReceiver] = useState(null);
  const [receiverVisited, setReceiverVisited] = useState(false);

  const [zkAmount, setZkAmount] = useState(null);
  const [isValidZkAmount, setIsValidZkAmount] = useState(null);
  const [zkAmountVisited, setZkAmountVisited] = useState(false);

  const shouldShowReceiverError = receiverVisited && !isValidReceiver;
  const shouldShowZkError = zkAmountVisited && !isValidZkAmount;

  const onReceiverChange = e => {
    setReceiver(e.target.value);
    setIsValidReceiver(web3 ? web3.utils.isAddress(e.target.value) : null);
  };

  const onZkAmountChange = e => {
    setZkAmount(e.target.value);
    setIsValidZkAmount(zkBalance >= e.target.value);
  };

  const createNote = (value, access, noteOwner) => {
    try {
      if (!web3.utils.isAddress(noteOwner)) return;
      const resolvedAccess = [...access, web3.eth.getAccounts()[0]];
      return note(dummyPubKey, value, resolvedAccess, noteOwner);
    } catch (error) {
      console.error(error);
    }
  };

  const createJoinSplitProof = (inputNotes, outputNotes, publicValue) => {
    try {
      const senderAndOwner = web3.eth.getAccounts()[0];
      return new JoinSplitProof(
        inputNotes,
        outputNotes,
        senderAndOwner,
        publicValue,
        senderAndOwner
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async e => {
    e.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    // const testAcc = TEST_ACCOUNT_ADDRESS;

    const notes = await zkAsset.send(
      [
        {
          to: "0xDABADe2B56B6f3aa9F1826C23A51bb816c3d92da",
          // aztecAccountNotRequired: true,
          amount: 5,
          numberOfOutputNotes: 1
        }
      ],
      {
        // userAccess: ["0xDABADe2B56B6f3aa9F1826C23A51bb816c3d92da"] // gives view access to sender and reciever
      }
    );
    console.log("created note is", notes);
  };

  // const onClick = async e => {
  //   e.preventDefault();
  //   const inputNotes = [createNote(zkAmount, [], PRIVATE_ESCROW_ADDRESS)];
  //   const outputNotes = [createNote(zkAmount, [], PRIVATE_ESCROW_ADDRESS)];
  //   const proof = createJoinSplitProof(inputNotes, outputNotes, 0);

  //   const zkAsset = new web3.eth.Contract(ZkAsset.abi, ZK_ASSET_ADDRESS);
  //   await zkAsset.methods
  //     .confidentialTransfer(proof, signatures)
  //     .send({ from: web3.eth.getAccounts[0] });
  // };

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
        error={() =>
          shouldShowZkError
            ? "the amount of zk you are trying to send is above your balance"
            : null
        }
      >
        <Input
          placeholder="20"
          value={zkAmount}
          error={shouldShowZkError}
          positive={zkAmountVisited && isValidZkAmount}
          onChange={onZkAmountChange}
          onBlur={() => setZkAmountVisited(true)}
        />
      </FormControl>
      <Button disabled={!isValidZkAmount || !isValidReceiver} onClick={onClick}>
        Create
      </Button>
    </>
  );
};
