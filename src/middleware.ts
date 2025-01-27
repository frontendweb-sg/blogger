import { NextResponse } from "next/server";
import { auth } from "./auth";
import { Jwt } from "./lib/jwt";
import { logEvent } from "./utils/logger";

/**
 * middleware
 */
export default auth(function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.auth?.user; // Token representing the authenticated user

  // Redirect to login page if the user is not authenticated and trying to access a user-related page
  if (pathname.startsWith("/user") && !token) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.append("from", req.url);
    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/api/post/:path*", "/user/:path*"],
};
