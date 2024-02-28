import React from "react";
import Image from "next/image";
import { Link } from "@/navigations";
import { Button } from "@/components/ui/button";
const QuestionCard = ({ t, title, caption, questionId }) => {
  return (
    <div className="flex w-[100%] border-2 border-primary p-3 rounded-md">
      <div className="w-full">
        <h1 className="text-2xl w-full border-b-2 border-primary">{title}</h1>
        <p className="text-primary-foreground w-full text-base my-5">
          {caption}
        </p>
        <Link href={`/questions/${questionId}`}>
          <Button>{t.Details}</Button>
        </Link>
      </div>
      {/* <Image src={""} alt="" width={""} height={""} />  */}
    </div>
  );
};

export default QuestionCard;
