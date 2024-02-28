"use client";
import React from "react";
import Image from "next/image";
import { Link } from "@/navigations";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const sendVote = async (id, wallet, questionId) => {
  const res = await axios.post(`http://localhost:8085/api/auth/ssop`, {
    questionId: questionId,
    optionId: id,
    walletStr: wallet,
  });
  console.log(res.data);

  return res.data;
};

const QuestionDetailOptionCard = ({
  title,
  desc,
  id,
  wallet,
  questionId,
  count,
  isPastDate,
  t
}) => {
  const router = useRouter();

  const send = async () => {
    if (wallet.length <= 0) {
      toast.error("Please connect your wallet");
    } else {
      await sendVote(id, wallet, questionId)
        .then((res) => {
          console.log("success", res);
          toast.success("success");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  return (
    <div className="flex w-[80%] border-2 border-primary p-3 rounded-md">
      <div className="w-full">
        <h1 className="text-2xl w-full border-b-2 border-primary ">{title}</h1>
        <p className="text-primary-foreground w-full text-base my-5">{desc}</p>
        <div className="w-full flex flex-row-reverse justify-between items-center">
          <p>{t.voteCount }: {count}</p>
          <Button onClick={send} disabled={isPastDate}>
            {t.vote}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailOptionCard;
