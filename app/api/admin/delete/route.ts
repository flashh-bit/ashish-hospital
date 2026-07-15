import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // 'filename' here is actually the blob URL sent from the frontend
    const { filename } = body;

    if (!filename) {
      return NextResponse.json(
        { success: false, error: "Filename (URL) is required" },
        { status: 400 }
      );
    }

    // Delete the file from Vercel Blob using its URL
    await del(filename);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
