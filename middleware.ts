import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const ADMIN_MATCHER = ["/admin", "/admin/(.*)"];

export default auth((req) => {
  const isAdminRoute = ADMIN_MATCHER.some((matcher) => {
    if (matcher.endsWith("(.*)")) {
      const base = matcher.replace("/(.*)", "");
      return req.nextUrl.pathname.startsWith(base);
    }
    return req.nextUrl.pathname === matcher;
  });

  if (isAdminRoute) {
    if (!req.auth) {
      const signInUrl = new URL("/login", req.nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(signInUrl);
    }

    if (req.auth.user?.role !== "ADMIN") {
      const home = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(home);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
