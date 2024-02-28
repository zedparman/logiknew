import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import Question from "@/models/Question";


export async function POST(req, res) {
  await connectDb();
  const data = await req.json();

  const { questionId, optionId, walletStr } = data;
  console.log({ questionId, optionId, walletStr });

  const existingVote = await Question.findOne({
    questionId,
    "options.id": optionId,
    "options.voters": walletStr,
  });

  if (existingVote) {
    return NextResponse.json(
      { status: "fail", message: "You have already voted for this option." },
      { status: 400 }
    );
  }
  const updatedQuestion = await Question.findOne({
    questionId,
    "options.id": optionId,
  });

  if (updatedQuestion) {
    const optionIndex = updatedQuestion.options.findIndex(
      (option) => option.id === optionId
    );
    if (optionIndex !== -1) {
      updatedQuestion.options[optionIndex].voters.push(walletStr);
      updatedQuestion.options[optionIndex].count++;

      updatedQuestion.markModified("options");
      await updatedQuestion.save();

      return NextResponse.json(
        {
          status: "success",
          message: "Your vote has been registered.",
          updatedQuestion,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "fail", message: "Option not found in the question." },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { status: "fail", message: "Question not found." },
      { status: 404 }
    );
  }
}