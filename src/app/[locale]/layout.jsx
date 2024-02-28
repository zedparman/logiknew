import { Inter } from "next/font/google";
import localeFont from "next/font/local";
import { ThemeProvider } from "./components/ThemeProvider";
import useTextDirection from "./libs/useTextDirection";
import NavBar from "./components/Nav/NavBar";
import SessionProvider from "../context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import HomeSideNv from "./components/Home/HomeSideNv";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const IranSansFont = localeFont({
  src: "../../assets/fonts/IRANSansX-Medium.ttf",
});
export const metadata = {
  title: "Questions Area",
  description: "",
};

export default async function RootLayout({ children, params: { locale } }) {
  const direction = useTextDirection(locale);
  const session = await getServerSession();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body
        className={IranSansFont.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <StoreProvider>
              <NavBar session={session} />
              <div className="flex flex-col space-y-6 mt-10 ">
                <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                  <aside className=" w-[200px] flex-col md:flex">
                    <HomeSideNv session={session} />
                  </aside>
                  <main>{children}</main>
                </div>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
            </StoreProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
