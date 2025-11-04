import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// The function is now named 'proxy'
export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // The logic for redirecting if no session is still here,
  // but remember: rely on this for optimistic UX, not strict security.
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Use NextResponse.next() to allow the request to continue
  return NextResponse.next();
}

export const config = {
  // The 'config' object and 'matcher' usage remains the same
  matcher: ["/dashboard/:path*", "/user"],
};
