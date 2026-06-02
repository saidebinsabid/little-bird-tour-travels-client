import { NextResponse } from "next/server";

/**
 * Next.js 16 "proxy" (successor to middleware.js). Coarse server-side gate:
 * if there is no session cookie, bounce to login before any dashboard HTML
 * is sent. The backend still verifies the JWT and enforces real authorization
 * on every API call — that remains the security boundary.
 */
export default function proxy(request) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
