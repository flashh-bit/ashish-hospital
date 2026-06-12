import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "fallback_super_secret_key_123456";
const encodedSecret = new TextEncoder().encode(SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (password === process.env.ADMIN_PASSWORD) {
      // Create JWT payload
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h") // Token expires in 24 hours
        .sign(encodedSecret);

      // Create response and set HTTP-only cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours in seconds
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
