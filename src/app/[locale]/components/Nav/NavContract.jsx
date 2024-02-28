"use client";
import React from "react";
import { connectWallet, truncate } from "../../../../../services/blockchain";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const NavContract = ({ text, fatext }) => {
  const { wallet } = useSelector((states) => states.globalStates);

  return wallet ? (
    <Button className="w-full flex text-center justify-between bg-primary cursor-not-allowed">
      {fatext} :{" "}
      {truncate({ text: wallet, startChars: 4, endChars: 4, maxLength: 11 })}
    </Button>
  ) : (
    <Button
      onClick={connectWallet}
      className="w-full flex justify-between bg-primary cursor-pointer"
    >
      {text}
    </Button>
  );
};

export default NavContract;
