import React from "react";
import QuestionP from "../../components/QuestionDetail/QuestionP";
import { useMessages } from "next-intl";

const QuestionId = (props) => {
  const t = useMessages("SignIn");

  return <QuestionP params={props.params.questionId} t={t.QuestionDetailCom} />;
};

export default QuestionId;
