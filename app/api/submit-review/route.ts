import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, text, date } = body;

    // Validate
    if (!name || !rating || !text) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be 1-5" },
        { status: 400 }
      );
    }

    if (text.length < 20) {
      return NextResponse.json(
        { success: false, error: "Review must be at least 20 characters" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "reviews.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const reviews = JSON.parse(data);

    const newReview = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      text,
      date: date || new Date().toISOString(),
      approved: false,
    };

    reviews.push(newReview);
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
