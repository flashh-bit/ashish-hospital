import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "Ashish Hospital",
    "description": "Quality healthcare services in Rudrapur, Uttar Pradesh.",
    "url": "https://ashishhospital.vercel.app",
    "telephone": "+91-9792133555",
    "email": "ashishhospital555@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Markadi Gate, Pidra Road",
      "addressLocality": "Rudrapur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "263153",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.508782,
      "longitude": 83.792411
    },
    "openingHours": "Mo-Sa 08:00-20:00",
    "image": "https://ashishhospital.vercel.app/og-image.jpg",
    "sameAs": []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <AnimatedSection>{null}</AnimatedSection>
    </>
  );
}
