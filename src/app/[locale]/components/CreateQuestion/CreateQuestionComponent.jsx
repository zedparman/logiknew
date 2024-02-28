import React from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import axios from "axios";
import { getServerSession } from "next-auth";

const getQuestion = async (email) => {
  const res = await axios.post(`${process.env.BASE_API}/api/auth/getqusa`, {
    userEmail: email,
  });
  return res.data;
};


const CreateQuestionComponent = async({ t }) => {
  const session = await getServerSession();
  const res = await getQuestion(session.user.email);
  console.log({ res });
  return (
    <section>
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="my-4 text-lg">{t.subTitle}</p>
      <CreateQuestionForm t={t} savedOptions={res} />
    </section>
  );
};

export default CreateQuestionComponent;
