import type { Metadata } from "next";
import Image from "next/image";
import { list } from "@vercel/blob";

export const metadata: Metadata = {
  title: "Gallery — Ashish Hospital",
  description:
    "View photos of Ashish Hospital's facilities, medical equipment, and patient care areas.",
  alternates: {
    canonical: "https://ashish-hospital-rudrapur.vercel.app/gallery",
  },
};

type GalleryItem = {
  url: string;
  title: string;
  uploadedAt: string;
};

async function getGallery(): Promise<GalleryItem[]> {
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

      return {
        url: blob.url,
        title: title,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    // Sort by uploadedAt descending
    gallery.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return gallery;
  } catch (error) {
    console.error("Failed to fetch gallery from Blob:", error);
    return [];
  }
}

// Ensure the page always fetches the latest images
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <>
      {/* Hero */}
      <section style={{ background: "#FAFAFA", padding: "64px 80px", textAlign: "center" }}>
        <div className="mx-auto" style={{ maxWidth: "700px" }}>
          <div className="hero-fade-1 inline-block" style={{ border: "1px solid #E8E8E8", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "#888888", marginBottom: "20px" }}>
            Gallery
          </div>
          <h1 className="font-heading hero-fade-2" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A" }}>
            Our Hospital In <span className="text-purple">Pictures</span>
          </h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: "48px 80px 80px", background: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          {gallery.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-[16px]">
              {gallery.map((item, i) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-anim="scale-in"
                  data-stagger={`${(i % 5) + 1}`}
                  style={{
                    marginBottom: "16px",
                    breakInside: "avoid",
                    overflow: "hidden",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Image
                    src={item.url}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    style={{ transition: "transform 0.3s ease, filter 0.3s ease" }}
                  />
                  <div className="p-3 bg-white border border-t-0 border-[#E8E8E8] rounded-b-[12px]">
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: "80px 0" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto" style={{ marginBottom: "16px" }}>
                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="13" r="3" stroke="#888888" strokeWidth="1.5" />
              </svg>
              <p style={{ fontSize: "18px", color: "#888888" }}>Gallery coming soon</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
