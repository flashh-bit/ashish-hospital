import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

// Rebuilds and saves the public gallery index to Blob
async function rebuildIndex() {
  const { blobs } = await list({ prefix: "gallery/" });

  const items = blobs
    .filter((b) => b.pathname !== "gallery-index.json")
    .map((blob) => {
      const basename = blob.pathname.replace("gallery/", "");
      let title = "Gallery Image";
      const dashIndex = basename.indexOf("-");
      if (dashIndex !== -1) {
        const withoutTimestamp = basename.substring(dashIndex + 1);
        title = withoutTimestamp.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
      }
      return { url: blob.url, title, uploadedAt: blob.uploadedAt.toISOString() };
    })
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  await put("gallery-index.json", JSON.stringify(items), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return items;
}

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
      const title = titles[i] || file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !["jpg", "jpeg", "png", "webp"].includes(ext)) continue;
      if (file.size > 5 * 1024 * 1024) continue;

      const safeTitle = title.trim().replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
      const filename = `gallery/${Date.now()}-${safeTitle}.${ext}`;

      const blob = await put(filename, file, { access: "public", addRandomSuffix: false });
      uploadedFiles.push(blob.url);
    }

    // Rebuild the public index after upload
    await rebuildIndex();

    return NextResponse.json({ success: true, filenames: uploadedFiles });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
