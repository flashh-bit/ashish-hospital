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
      // The public_id looks like: ashish-hospital-gallery/168923456-My_Image
      const basename = file.public_id.replace("ashish-hospital-gallery/", "");
      let title = "Gallery Image";
      const dashIndex = basename.indexOf("-");
      if (dashIndex !== -1) {
        title = basename.substring(dashIndex + 1).replace(/_/g, " ");
      }

      return {
        url: file.secure_url,
        title: title,
        uploadedAt: file.created_at,
        public_id: file.public_id, // We'll need this for deletion
      };
    });

    return NextResponse.json(gallery, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Cloudinary list fetch error:", error);
    return NextResponse.json([]);
  }
}
