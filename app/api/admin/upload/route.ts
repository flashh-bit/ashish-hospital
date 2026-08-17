import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const titles = formData.getAll("titles") as string[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: "No files uploaded" }, { status: 400 });
    }

    const uploadedFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let title = titles[i] || file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !["jpg", "jpeg", "png", "webp"].includes(ext)) continue;
      if (file.size > 5 * 1024 * 1024) continue; // 5MB limit

      const safeTitle = title.trim().replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");

      // Convert file to Base64 for Cloudinary upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString("base64");
      const fileUri = `data:${file.type};base64,${base64Data}`;

      // Upload to Cloudinary
      const response = await cloudinary.uploader.upload(fileUri, {
        folder: "ashish-hospital-gallery",
        public_id: `${Date.now()}-${safeTitle}`,
      });

      uploadedFiles.push(response.secure_url);
    }

    return NextResponse.json({ success: true, filenames: uploadedFiles });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
