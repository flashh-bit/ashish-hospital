import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// The gallery-index.json is a public blob file — no token needed to read it.
// Its URL pattern: https://<store-id>.public.blob.vercel-storage.com/gallery-index.json
const INDEX_URL = process.env.GALLERY_INDEX_URL || "";

export async function GET() {
  try {
    if (!INDEX_URL) {
      return NextResponse.json([], { headers: { "Cache-Control": "no-store" } });
    }
    const res = await fetch(INDEX_URL, { cache: "no-store" });
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Gallery index fetch error:", error);
    return NextResponse.json([]);
  }
}
