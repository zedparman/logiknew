import { useMessages } from "next-intl";
import HomePageComponent from "./components/Home/HomePageComponent";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  // const t = useTranslations("Index");
  const session = await getServerSession();

  return <HomePageComponent isAuth={session} />;
}
