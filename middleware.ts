import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

   const protectedRoutes = [
    "/dashboard",
    "/members",
    "/billing",
    "/analytics",
    "/api-keys",
    "/settings",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

   if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

   if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/members/:path*",
    "/billing/:path*",
    "/analytics/:path*",
    "/api-keys/:path*",
    "/settings/:path*",
    "/login",
  ],
};
