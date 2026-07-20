import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "gallery/" });

    const gallery = blobs.map((blob) => {
      const basename = blob.pathname.replace("gallery/", "");
      let title = "Gallery Image";
      const dashIndex = basename.indexOf("-");
      if (dashIndex !== -1) {
        const withoutTimestamp = basename.substring(dashIndex + 1);
        title = withoutTimestamp.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
      }
      return { url: blob.url, title, uploadedAt: blob.uploadedAt.toISOString() };
    });

    gallery.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json(gallery, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Public gallery list error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
