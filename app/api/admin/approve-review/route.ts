import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Review ID is required" },
        { status: 400 }
      );
    }

    const reviewsPath = path.join(process.cwd(), "data", "reviews.json");
    let reviews: { id: string; name: string; rating: number; text: string; date: string; approved?: boolean }[] = [];

    try {
      const data = fs.readFileSync(reviewsPath, "utf-8");
      reviews = JSON.parse(data);
    } catch {
      reviews = [];
    }

    reviews = reviews.map((r) =>
      r.id === id ? { ...r, approved: true } : r
    );

    fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Approve review error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
