import { auth } from "@/app/libs/auth/auth";

export { auth as middleware } from "@/app/libs/auth/auth";
// middleware.js

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(newUrl);
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/dashboard"],
  runtime: "nodejs",
};
