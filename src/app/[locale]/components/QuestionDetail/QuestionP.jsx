import { useParams } from "next/navigation";
import React from "react";
import axios from "axios";
import QuestionDetailCl from "./QuestionDetailCl";
// import QuestionDetailOptionCard from "../../components/QuestionDetail/QuestionDetailOptionCard";
// import { getServerSession } from "next-auth";

const getQuestion = async (id) => {
  const response = await axios.post(
    `${process.env.BASE_API + `/api/get-question/`}`,
    { id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const QuestionP = async ({ params, t }) => {
  const res = await getQuestion(params);

  return <QuestionDetailCl t={t} res={res} />;
};

export default QuestionP;
