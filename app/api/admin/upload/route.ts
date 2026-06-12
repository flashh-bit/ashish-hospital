import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    const galleryDir = path.join(process.cwd(), "public", "gallery");
    const galleryJsonPath = path.join(process.cwd(), "data", "gallery.json");

    // Ensure gallery directory exists
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
    }

    // Read current gallery data
    let gallery: { filename: string; title: string; uploadedAt: string }[] = [];
    try {
      const data = fs.readFileSync(galleryJsonPath, "utf-8");
      gallery = JSON.parse(data);
    } catch {
      gallery = [];
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

      const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(galleryDir, filename);

      fs.writeFileSync(filePath, buffer);

      gallery.push({
        filename,
        title: title.trim() || "Gallery Image",
        uploadedAt: new Date().toISOString(),
      });

      uploadedFiles.push(filename);
    }

    // Write updated gallery data
    fs.writeFileSync(galleryJsonPath, JSON.stringify(gallery, null, 2));

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
