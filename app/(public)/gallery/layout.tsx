import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Ashish Hospital",
  description:
    "View photos of Ashish Hospital's facilities, medical equipment, and patient care areas.",
  alternates: {
    canonical: "https://ashish-hospital-rudrapur.vercel.app/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
