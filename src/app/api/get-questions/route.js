import { NextResponse } from "next/server";
import connectDb from "../../../../utils/connectDB";
import Question from "@/models/Question";
export async function GET() {
  await connectDb()
  const questions = await Question.find({})
  if (!questions) {
    return NextResponse.json({ status : "success" , message: "okeye" , data : [] } , {status : 200});

  }
  return NextResponse.json({ status : "success" , message: "okeye" , data : questions } , {status : 200});
}
