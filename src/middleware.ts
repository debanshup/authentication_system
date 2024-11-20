import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for the "sessionid" cookie
  const sessionId = request.cookies.get("sessionId")?.value;

console.log("pathname:  "+pathname);


  // Define routes that don't require authentication
  const publicRoutes = [
    "/signup",
    "/login",
    "/verify-email",
    "/enter-email",
    "/reset-password",
    "/",
    "/verify-otp",
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname);
  // user logged in access public routes

  if (sessionId && isPublicRoute) {
    return NextResponse.redirect(new URL("/profile/", request.nextUrl));
  }
  if (!sessionId && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // Allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware to specific paths
export const config = {
  matcher: [
    "/", // Home page
    "/profile/:path*", // Protect dynamic profile routes (e.g., /profile/[name])
    "/settings/:path*", // Protect all settings subpaths (e.g., /settings/edit, /settings/account)
    "/enter-email", // Email verification
    "/verify-email", // Email verification
    "/verify-update", // Updating verification
    "/verify-otp", // OTP verification
    "/reset-password", // Password reset
    "/logout",
    "/login",
  ],
};
