import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:ashish-hospital-gallery")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gallery = result.resources.map((file: any) => {
      const basename = file.public_id.replace("ashish-hospital-gallery/", "");
      let title = "Gallery Image";
      const dashIndex = basename.indexOf("-");
      if (dashIndex !== -1) {
        title = basename.substring(dashIndex + 1).replace(/_/g, " ");
      }

      return {
        filename: file.public_id, // We use public_id here so the admin panel can delete it
        url: file.secure_url,
        title: title,
        uploadedAt: file.created_at,
      };
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Cloudinary admin gallery list error:", error);
    return NextResponse.json([]);
  }
}
