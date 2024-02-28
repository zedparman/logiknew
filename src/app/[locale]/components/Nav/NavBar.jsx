import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import ChangeLangDropDown from "./ChangeLangDropDown";
import SideNav from "./SideNav";
import { Link } from "@/navigations";
import { useMessages } from "next-intl";
import { UserNav } from "./UserNav";
import NavContract from "./NavContract";

const NavBar = ({ session }) => {
  const t = useMessages("Dasboard");

  return (
    <nav className="p-5 flex justify-between items-center border ">
      <Link href={"/"}>
        <h1>LogikMeter</h1>
      </Link>
      <div className="flex items-center gap-3">
        {session == null ? <></> : <UserNav t={t.Dashboard} data={session} />}
        <ChangeLangDropDown />
        <ThemeToggle />

        <SideNav t={t} isAuth={session} />
      </div>
    </nav>
  );
};

export default NavBar;
