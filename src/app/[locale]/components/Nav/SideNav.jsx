import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/navigations";
import { useMessages } from "next-intl";
import { Home, Settings, SquarePen, ScrollText } from "lucide-react";
import uniqid from "uniqid";

const SideNav = ({ isAuth }) => {
  // console.log()

  const t = useMessages("Index");
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <RxHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>LogikMeter</Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {isAuth == null ? (
            <>
              <Link href={"/signin"}>{t.Index.signIn}</Link>
              <Link href={"/signup"}>{t.Index.signUp}</Link>
              <Link href={"/questions"}>{t.Index.questions}</Link>
            </>
          ) : (
            navItems.map((item) => (
              <Link
                key={uniqid()}
                href={item.href}
                className="w-full flex justify-between items-center hover:bg-card p-2"
              >
                {item.name}
                <span>
                  <item.icon />
                </span>
              </Link>
            ))
          )}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
