import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { departments } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Departments — Ashish Hospital",
  description:
    "Explore the comprehensive medical departments at Ashish Hospital, from general medicine and surgery to pediatrics and emergency care.",
  alternates: {
    canonical: "https://ashishhospital.vercel.app/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="Departments"
        title={<>Explore Our Medical <span className="text-purple">Departments</span></>}
        description="Comprehensive and compassionate care, utilizing the latest advancements in medical technology to ensure the best outcomes for our patients."
        imageSrc="https://picsum.photos/420/380?random=20"
        imageAlt="Doctors with tablet"
        pills={[
          { text: "Pediatrics",       position: "top-left"    },
          { text: "General Medicine", position: "top-right"   },
          { text: "Cardiology",       position: "bottom-left" },
        ]}
      />

      {/* Departments Grid */}
      <section className="px-5 md:px-12 lg:px-20 py-10 md:py-16" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
            {departments.map((dept, i) => (
              <div
                key={dept.id}
                className="card-hoverable"
                data-anim="fade-up"
                data-stagger={`${(i % 3) + 1}`}
                style={{ background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: "16px", padding: "24px", cursor: "pointer" }}
              >
                <div className="flex items-center justify-center" style={{ width: "44px", height: "44px", background: "#F3E5F5", borderRadius: "10px", marginBottom: "16px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M2 12h20" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-heading" style={{ fontSize: "17px", fontWeight: 600, color: "#1A1A1A", marginBottom: "8px" }}>{dept.name}</h3>
                <p style={{ fontSize: "14px", color: "#888888", lineHeight: 1.5 }}>{dept.description}</p>
                <span className="arrow-link" style={{ fontSize: "13px", fontWeight: 600, color: "#16A34A", marginTop: "16px", display: "inline-flex" }}>See More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-12 lg:px-20 pb-12 md:pb-20">
        <div className="mx-auto relative overflow-hidden" style={{ maxWidth: "1280px", background: "linear-gradient(to right, #16A34A, #15803D)", borderRadius: "20px", padding: "clamp(32px, 6vw, 48px) clamp(24px, 5vw, 56px)" }}>
          <div className="absolute pointer-events-none" style={{ right: "-60px", top: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <h2 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "white", lineHeight: 1.4, maxWidth: "520px" }}>
              Experience top-quality healthcare at <span style={{ color: "#F0FDF4", borderBottom: "2px solid #86EFAC" }}>Ashish Hospital</span>. Schedule your appointment today!
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-2" style={{ background: "white", color: "#16A34A", borderRadius: "999px", padding: "14px 28px", fontSize: "14px", fontWeight: 600 }}>
              Make an Appointment →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
