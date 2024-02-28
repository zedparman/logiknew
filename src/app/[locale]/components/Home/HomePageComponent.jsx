import { Link } from "@/navigations";
import React from "react";
import QuestionsPageComponent from "../Questions/QuestionsPageComponent";
import { Home, Settings, SquarePen, ScrollText } from "lucide-react";
import uniqid from "uniqid";
import { useMessages } from "next-intl";
const HomePageComponent = ({ isAuth }) => {
  const t = useMessages("SignIn");

  const navItems = [
    { name: t.Dashboard.Home, href: "/accounts/dashboard", icon: Home },

    {
      name: t.Dashboard.CreateQuestion,
      href: "/accounts/dashboard/create-question",
      icon: SquarePen,
    },
    {
      name: t.Dashboard.QuestionsList,
      href: "/questions",
      icon: ScrollText,
    },
    {
      name: t.Dashboard.MyQuestions,
      href: "/accounts/dashboard/questions-list",
      icon: ScrollText,
    },
    {
      name: t.Dashboard.saveQuestions,
      href: "/accounts/dashboard/save-questions",
      icon: ScrollText,
    },
    {
      name: t.Dashboard.Settings,
      href: "/accounts/dashboard/settings",
      icon: Settings,
    },
  ];
  return (
    <main className="flex flex-col-reverse xl:flex-row-reverse xl:justify-between xl:items-start xl:px-5 w-full items-center justify-center bg-card">
      <section className="flex flex-col items-center justify-center w-[80%] mt-5">
        <h1 className="text-2xl font-bold text-primary">LogikMeter</h1>
        {/* <h2>{t("subTitle")}</h2> */}
        <QuestionsPageComponent t={t.QuestionsPageCom} subT={false} />
      </section>
    </main>
  );
};

export default HomePageComponent;
