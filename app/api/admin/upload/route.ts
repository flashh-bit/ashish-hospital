import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const titles = formData.getAll("titles") as string[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadedFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = titles[i] || file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

      // Validate file type
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !["jpg", "jpeg", "png", "webp"].includes(ext)) {
        continue;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        continue;
      }

      // Create a safe title for the filename
      const safeTitle = title.trim().replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
      const filename = `gallery/${Date.now()}-${safeTitle}.${ext}`;

      // Upload to Vercel Blob
      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: false,
      });

      uploadedFiles.push(blob.url);
    }

    return NextResponse.json({
      success: true,
      filenames: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
