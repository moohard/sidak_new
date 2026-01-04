import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_MOCK_API === "true") {
    return NextResponse.next();
  }
  const path = request.nextUrl.pathname;
  const isPublicRoute =
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path.startsWith("/authentication") ||
    path.startsWith("/pages/authentication");

  if (!isPublicRoute && !request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isPublicRoute && request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/dashboard/default", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/widgets/:path*",
    "/app/:path*",
    "/forms/:path*",
    "/table/:path*",
    "/ui-kits/:path*",
    "/bonus-ui/:path*",
    "/icons/:path*",
    "/buttons/:path*",
    "/charts/:path*",
    "/editor/:path*",
    "/pages/sample-page",
    "/login",
    "/register",
    "/forgot-password",
    "/authentication/:path*",
    "/pages/authentication/:path*",
    "/pegawai/:path*",
    "/absensi/:path*",
    "/admin/:path*",
    "/portal/:path*",
  ],
};
