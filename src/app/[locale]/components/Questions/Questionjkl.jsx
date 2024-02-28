"use client";
import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

const Questionjkl = ({ res, t, subT }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = res?.data
    ?.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse();
  return (
    <section className="flex flex-col w-full items-center justify-center p-2">
      {subT == false ? (
        ""
      ) : (
        <h1 className="text-2xl font-bold text-primary">{t.title}</h1>
      )}
      <input
        type="text"
        placeholder="Search by name"
        className="w-[40%] p-2 my-5 rounded-lg outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="my-5 w-full flex flex-col items-center gap-7 w-full">
        {filteredData.map((item) => (
          <QuestionCard key={item._id} t={t} path={"60"} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Questionjkl;
