import { NextRequest, NextResponse } from "next/server";
import { del, list, put } from "@vercel/blob";

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
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename } = body; // filename is actually the blob URL

    if (!filename) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    await del(filename);

    // Rebuild the public index after delete
    await rebuildIndex();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
