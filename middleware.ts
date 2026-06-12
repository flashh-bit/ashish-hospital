import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Ensure this matches the secret used in your auth route
// We use a fallback just for testing, but in production, ALWAYS use env var
const SECRET_KEY = process.env.JWT_SECRET || "fallback_super_secret_key_123456";
const encodedSecret = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
  // Only apply to /api/admin/* (excluding /api/admin/auth)
  if (
    request.nextUrl.pathname.startsWith("/api/admin/") &&
    !request.nextUrl.pathname.startsWith("/api/admin/auth")
  ) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    try {
      // Verify the JWT token
      await jwtVerify(token, encodedSecret);
      // If verification succeeds, continue to the API route
      return NextResponse.next();
    } catch (error) {
      console.error("JWT Verification failed:", error);
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/admin/:path*",
};
