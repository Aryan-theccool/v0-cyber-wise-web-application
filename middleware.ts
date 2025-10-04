import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;

  // Check if user has a valid session
  const session = sessionCookie ? await verifySession(sessionCookie) : null;

  // If user is NOT logged in
  if (!session) {
    // Allow access only to the login page (/)
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user IS logged in
  if (session) {
    // Redirect from login page to home
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    // Allow access to all other pages
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
