import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "reviews.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const reviews = JSON.parse(data);
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([]);
  }
}
