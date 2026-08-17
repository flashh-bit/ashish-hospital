import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename } = body; // filename is actually the blob URL

    if (!filename) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    await del(filename);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
