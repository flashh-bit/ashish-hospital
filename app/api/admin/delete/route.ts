import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename } = body;

    if (!filename) {
      return NextResponse.json(
        { success: false, error: "Filename is required" },
        { status: 400 }
      );
    }

    const galleryDir = path.join(process.cwd(), "public", "gallery");
    const galleryJsonPath = path.join(process.cwd(), "data", "gallery.json");
    const filePath = path.join(galleryDir, filename);

    // Delete the file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from gallery.json
    let gallery: { filename: string; uploadedAt: string }[] = [];
    try {
      const data = fs.readFileSync(galleryJsonPath, "utf-8");
      gallery = JSON.parse(data);
    } catch {
      gallery = [];
    }

    gallery = gallery.filter((item) => item.filename !== filename);
    fs.writeFileSync(galleryJsonPath, JSON.stringify(gallery, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
