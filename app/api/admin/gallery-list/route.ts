import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "gallery.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const gallery = JSON.parse(data);
    return NextResponse.json(gallery);
  } catch {
    return NextResponse.json([]);
  }
}
