import React from "react";
import QuestionCard from "./QuestionCard";
import axios from "axios";
import Questionjkl from "./Questionjkl";

const getAllQuestions = async () => {
  const response = await axios.get(
    `${process.env.BASE_API + "/api/get-questions"}`
  );
  return response.data;
};
const QuestionsPageComponent = async ({ t, subT }) => {
  const res = await getAllQuestions();
  console.log({ res });
  return <Questionjkl res={res} t={t} subT={subT} />;
};

export default QuestionsPageComponent;
