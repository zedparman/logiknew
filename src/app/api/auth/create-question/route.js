import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";

import User from "@/models/User";
import Question from "@/models/Question";
import uniqid from "uniqid";
import slugify from "slugify";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const { title, description, options, endDate } = data;

  if (!title || !description || !options) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Please fill in all fields.",
      },
      { status: 401 }
    );
  }

  const session = await getServerSession({ req });
  // console.log({ session });

  if (session == null) {
    return NextResponse.json(
      {
        status: "failed",
        message: "invalid token",
      },
      { status: 401 }
    );
  }

  const newEndDate = endDate == undefined ? "01" : endDate;
  console.log(newEndDate);

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json(
      {
        status: "failed",
        message: "User not found.",
      },
      { status: 404 }
    );
  }
  const authorName = user?.name;
  console.log(authorName);

  const oldTitle = `${title + " " + uniqid()}`;
  const convertTitle = slugify(oldTitle);

  const newQuestion = new Question({
    questionId: convertTitle,
    author: authorName,
    title: title,
    caption: description,
    options: options,
    endDate: endDate,
  });
  console.log(newQuestion);

  await newQuestion.save();

  await user?.questions?.push(newQuestion);

  await user.save();

  return NextResponse.json({
    status: "success",
    message: "Question successfully created!",
  });
}
