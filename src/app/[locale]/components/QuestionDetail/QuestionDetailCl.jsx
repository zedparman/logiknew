"use client";
import React from "react";
import QuestionDetailOptionCard from "./QuestionDetailOptionCard";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import { useMessages } from "next-intl";

const QuestionDetailCl = ({ res  , t}) => {
  const { wallet } = useSelector((states) => states.globalStates);

  // Check if the selected date is in the past
  const currentDate = new Date();
  const selectedDate = new Date(res.data.endDate);

  const isPastDate = selectedDate < currentDate;
  console.log(isPastDate);
  const wa = wallet;
  return (
    <section className="flex flex-col p-2">
      <div className="flex flex-col gap-4 p-3">
        <h1 className="text-2xl border-b-2 font-bold border-primary w-auto">
          {res.data.title}
        </h1>
        <p className="text-primary-foreground text-base ">{res.data.caption}</p>
        <p className="my-2">
          {t.author}: <span className="text-primary">{res.data.author}</span>
        </p>
        {/* <p>Wallet Addres</p> */}
      </div>
      <div className="flex flex-col p-3 my-5">
        <h1 className="text-2xl font-bold">Options</h1>
        <div className="my-5 w-full flex flex-col items-center gap-7">
          {res?.data?.options?.map(
            (item) => (
              <QuestionDetailOptionCard
                // session={session}
                wallet={wallet}
                questionId={res.data.questionId}
                isPastDate={isPastDate}
                key={uniqid()}
                {...item}
                t={t}
              />
            )
            // console.log(item)
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionDetailCl;
