import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "gallery/" });

    const gallery = blobs.map((blob) => {
      // Extract title from filename: gallery/1681234567-Reception_Area.jpg
      const basename = blob.pathname.replace("gallery/", "");
      let title = "Gallery Image";
      
      const dashIndex = basename.indexOf("-");
      if (dashIndex !== -1) {
        const withoutTimestamp = basename.substring(dashIndex + 1);
        title = withoutTimestamp.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
      }

      return {
        filename: blob.url, // Using full URL instead of local filename
        title: title,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    // Sort by uploadedAt descending (newest first)
    gallery.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Gallery list error:", error);
    return NextResponse.json([]);
  }
}
