import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About Us — Ashish Hospital",
  description:
    "Learn about Ashish Hospital's history, mission, values, and commitment to providing quality healthcare to the community.",
  alternates: {
    canonical: "https://ashishhospital.vercel.app/about",
  },
};

export default function AboutPage() {
  const stats = [
    { number: "20+", label: "Years" },
    { number: "10,000+", label: "Patients" },
    { number: "500+", label: "Staff" },
    { number: "50+", label: "Awards" },
  ];

  return (
    <>
      <PageHeader
        badge="About"
        title={<>Compassionate Care, Trusted by <span className="text-purple">Thousands</span></>}
        description="At Ashish Hospital, we combine medical excellence with genuine compassion. Learn about our journey, our team, and our commitment to your health."
        imageSrc="https://picsum.photos/420/380?random=25"
        imageAlt="Doctors team"
        pills={[
          { text: "Our Mission",   position: "top-left"     },
          { text: "Est. 2005",     position: "top-right"    },
          { text: "Award Winning", position: "bottom-left"  },
        ]}
      />

      {/* Stats Row */}
      <section className="px-5 md:px-12 lg:px-20" style={{ background: "white", padding: "36px clamp(20px,5vw,80px)", borderBottom: "1px solid #E8E8E8" }}>
        <div className="mx-auto flex flex-wrap justify-around" style={{ maxWidth: "1280px", gap: "24px" }}>
          {stats.map((s, i) => (
            <div key={i} className="text-center" data-anim="fade-up" data-stagger={`${i + 1}`}>
              <p className="font-heading" style={{ fontSize: "40px", fontWeight: 800 }}>
                {s.number.replace("+", "")}<span className="text-purple">+</span>
              </p>
              <p style={{ fontSize: "14px", color: "#888888" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Story — 2 columns */}
      <section className="px-5 md:px-12 lg:px-20 py-12 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center" style={{ maxWidth: "1280px", gap: "60px" }}>
          <div data-anim="fade-up">
            <Image src="https://picsum.photos/600/420?random=26" alt="Hospital" width={600} height={420} className="w-full object-cover" style={{ borderRadius: "20px", height: "420px" }} />
          </div>
          <div data-anim="fade-up" data-stagger="2">
            <p className="label-uppercase" style={{ marginBottom: "12px" }}>Our Story</p>
            <h2 className="font-heading" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "24px" }}>
              Why Choose Ashish <span className="text-purple">Hospital</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#555555", lineHeight: 1.7, marginBottom: "20px" }}>
              Ashish Hospital was founded with a simple yet powerful vision — to bring quality healthcare closer to home. What started as a small clinic has grown into a trusted healthcare institution serving thousands of patients every year.
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Patient-centered approach to every diagnosis", "Modern medical equipment and facilities", "Compassionate team of qualified specialists", "24/7 emergency and critical care services"].map((item, i) => (
                <li key={i} className="flex items-start gap-2" style={{ marginBottom: "12px", fontSize: "15px", color: "#555555" }}>
                  <span style={{ color: "#16A34A", fontWeight: 700, marginTop: "2px" }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
