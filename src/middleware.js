// // import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./navigations";
// // export default createMiddleware({
// //   defaultLocale: "fa",
// //   localePrefix,
// //   locales,
// // });

// // export const config = {
// //   // Match only internationalized pathnames
// //   matcher: ["/", "/(fa|en)/:path*"],
// // };

// import { withAuth } from "next-auth/middleware";
// import createIntlMiddleware from "next-intl/middleware";

// // const locales = ["en", "de"];
// const publicPages = ["/", "/signin"];

// const intlMiddleware = createIntlMiddleware({
//   defaultLocale: "fa",
//   localePrefix,
//   locales,
// });

// const authMiddleware = withAuth(
//   // Note that this callback is only invoked if
//   // the `authorized` callback has returned `true`
//   // and not for pages listed in `pages`.
//   function onSuccess(req) {
//     return intlMiddleware(req);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token != null,
//     },
//     pages: {
//       // signIn: "/signin",
//     },
//   }
// );

// export default function middleware(req) {
//   const publicPathnameRegex = RegExp(
//     `^(/(${locales.join("|")}))?(${publicPages
//       .flatMap((p) => (p === "/" ? ["", "/"] : p))
//       .join("|")})/?$`,
//     "i"
//   );
//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return authMiddleware(req);
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "fa",
  localeDetection: false,
  localePrefix,
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export default function middleware(req) {
  const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
