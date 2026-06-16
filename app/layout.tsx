import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashish-hospital-rudrapur.vercel.app"),
  title: {
    default: "Ashish Hospital — Quality Healthcare You Can Trust",
    template: "%s | Ashish Hospital",
  },
  description:
    "Ashish Hospital provides compassionate and quality healthcare services. Book appointments, explore our doctors, and learn about our medical departments.",
  openGraph: {
    type: "website",
    siteName: "Ashish Hospital",
    title: "Ashish Hospital — Quality Healthcare You Can Trust",
    description: "Compassionate, quality healthcare in Rudrapur, UP.",
    url: "https://ashish-hospital-rudrapur.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashish Hospital — Quality Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Hospital",
    description: "Quality healthcare in Rudrapur, UP.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ashish Hospital",
    alternateName: "Ashish Hospital Rudrapur",
    url: "https://ashish-hospital-rudrapur.vercel.app/",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
