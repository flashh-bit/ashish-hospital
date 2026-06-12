import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ashishhospital.vercel.app/",
  },
};
import Link from "next/link";
import { departments } from "@/data/services";
import DoctorsSection from "@/components/DoctorsSection";
import ReviewForm from "@/components/ReviewForm";
import ReviewCard from "@/components/ReviewCard";
import AppointmentModal from "@/components/AppointmentModal";
import dynamic from "next/dynamic";
import reviewsData from "@/data/reviews.json";
import fs from "fs";
import path from "path";

const GalleryCarousel = dynamic(() => import("@/components/GalleryCarousel"), {
  ssr: false,
});

// Gallery data loader
type GalleryItem = { filename: string; title: string; uploadedAt: string };
function getGallery(): GalleryItem[] {
  try {
    const filePath = path.join(process.cwd(), "data", "gallery.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Department icon SVGs
function DeptIcon({ id }: { id: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    clipboard: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    heart: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    pulse: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    bone: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M18.5 5.5a3 3 0 00-4.24 0L5.5 14.26a3 3 0 104.24 4.24l8.76-8.76a3 3 0 000-4.24z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="6" r="2" stroke="#16A34A" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2" stroke="#16A34A" strokeWidth="1.5" />
      </svg>
    ),
    mother: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#16A34A" strokeWidth="1.5" />
        <path d="M6 21v-2a6 6 0 0112 0v2" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    brain: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 21h6" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    person: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" stroke="#16A34A" strokeWidth="1.5" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    ribbon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8 2 6 5 6 8c0 4 6 8 6 8s6-4 6-8c0-3-2-6-6-6z" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 16l-2 6 4-2 2 2M16 16l2 6-4-2-2 2" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return <>{iconMap[id] || iconMap.clipboard}</>;
}

export default function Home() {
  const gallery = getGallery();

  const heroStats = [
    { number: "20+", label: "Years of Experience" },
    { number: "10,000+", label: "Satisfied Patients" },
    { number: "10+", label: "Qualified Staff" },
    { number: "50+", label: "Medical Services Offered" },
    { number: "10+", label: "Awards & Recognitions" },
  ];

  const facilities = [
    { title: "Modern Operating Rooms", description: "Equipped with the latest surgical technology to ensure precise and safe procedures." },
    { title: "Advanced Imaging Center", description: "High-tech imaging equipment for accurate diagnostics and treatment planning." },
    { title: "Rehabilitation Center", description: "Facilities for recovery and physical therapy, including modern equipment." },
    { title: "Diagnostic Laboratory", description: "Full-service lab for comprehensive testing and rapid results." },
  ];

  return (
    <>
      <section id="home" className="relative px-5 md:px-12 lg:px-20 pt-[90px] md:pt-28 lg:pt-32 pb-10 md:pb-16 overflow-hidden" style={{ background: "#FFFFFF" }}>
        {/* Mobile Background Video Removed */}

        <div
          className="relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center gap-10 lg:gap-[60px]"
          style={{ maxWidth: "1280px" }}
        >
          {/* LEFT COLUMN */}
          <div className="relative z-10">
            <div
              className="hero-fade-1 inline-flex items-center gap-[6px]"
              style={{ border: "1px solid #E8E8E8", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "#888888", marginBottom: "24px" }}
            >
              24/7 Emergency Care
              <span style={{ color: "#16A34A", fontSize: "10px" }}>✦</span>
            </div>

            <h1
              className="font-heading hero-fade-2 max-w-[55%] lg:max-w-full"
              style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, lineHeight: 1.08, color: "#1A1A1A" }}
            >
              Leading the Way<br />in Quality<br /><span style={{ color: "#16A34A" }}>Healthcare</span>
            </h1>

            <div className="grid grid-cols-2 hero-fade-3" style={{ gap: "12px", marginTop: "32px" }}>
              <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "12px" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#1A1A1A" }}>Latest visited Doctor</span>
                  <span style={{ fontSize: "14px", color: "#16A34A" }}>↗</span>
                </div>
                <div className="flex" style={{ marginTop: "8px" }}>
                  {[1, 2, 3].map((num, i) => (
                    <div key={num} className="rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden" style={{ width: "32px", height: "32px", marginLeft: i === 0 ? 0 : "-6px" }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-300 mt-2">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "10px", color: "#888888", marginTop: "6px" }}>More than 10+ doctors at your services</p>
              </div>

              <div>
                <p style={{ fontSize: "13px", color: "#555555", lineHeight: 1.5 }}>
                  Join thousands who{" "}
                  <span style={{ color: "#16A34A" }}>trust Ashish Hospital</span>{" "}
                  for their medical needs.
                </p>
                <AppointmentModal>
                  <button
                    className="inline-flex items-center hover:bg-purple-hover"
                    style={{ marginTop: "10px", gap: "6px", background: "#16A34A", color: "white", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, transition: "background 0.2s" }}
                  >
                    Consultation
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </AppointmentModal>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="absolute right-[-5%] top-[10%] w-[55%] max-w-[220px] opacity-100 pointer-events-none z-0 lg:static lg:right-auto lg:top-auto lg:w-full lg:max-w-none lg:pointer-events-auto lg:z-auto hero-image-anim">
            <Image
              src="/doctor.svg"
              alt="Ashish Hospital healthcare"
              width={480}
              height={420}
              className="w-full object-contain"
              style={{ height: "clamp(160px, 45vw, 420px)" }}
              priority
            />
            <div className="absolute hero-card-anim hidden sm:block" style={{ bottom: "-20px", right: "-20px", background: "white", border: "1px solid #E8E8E8", borderRadius: "16px", padding: "16px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", width: "220px" }}>
              <p className="font-heading" style={{ fontSize: "15px", fontWeight: 600, color: "#1A1A1A" }}>Where Healing and<br />Technology Unite.</p>
              <div className="flex gap-1" style={{ marginTop: "12px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16A34A" }} />
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8E8E8" }} />
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8E8E8" }} />
              </div>
              <Link href="#about" className="arrow-link" style={{ fontSize: "13px", color: "#16A34A", fontWeight: 600, marginTop: "12px", display: "inline-flex" }}>See More →</Link>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="mx-auto flex justify-between items-start w-full" style={{ maxWidth: "1280px", marginTop: "clamp(40px, 8vw, 80px)", gap: "clamp(8px, 2vw, 28px)" }}>
          {heroStats.map((stat, i) => (
            <div key={i} className="stat-anim text-center flex-1" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <p className="font-heading" style={{ fontSize: "clamp(18px, 4vw, 36px)", fontWeight: 800, color: "#1A1A1A" }}>
                {stat.number.replace("+", "")}<span style={{ color: "#16A34A" }}>+</span>
              </p>
              <p style={{ fontSize: "clamp(9px, 2vw, 13px)", color: "#888888", marginTop: "2px", lineHeight: "1.2" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="px-5 md:px-12 lg:px-20 py-5 md:py-16 lg:py-20" style={{ background: "rgba(255, 255, 255, 1)" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          {/* Quote Banner */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-10 lg:p-14 mb-8 sm:mb-16 border border-[#E8E8E8] shadow-[0_8px_30px_rgb(0,0,0,0.04)]" data-anim="fade-up">
            <div className="relative mx-auto" style={{ maxWidth: "800px" }}>
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-heading" style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 500, color: "#1A1A1A", lineHeight: 1.6, marginBottom: "32px" }}>
                &ldquo;Welcome to <span style={{ color: "#16A34A", fontWeight: 700 }}>Ashish Hospital</span>, where we are dedicated to providing the highest standard of healthcare services. Our team of professionals is committed to ensuring your well-being and delivering personalized care.&rdquo;
              </p>
              
              <div className="flex items-center gap-4">
                <Image src="/pp1.jpeg" alt="Dr. Pujari Patel" width={52} height={52} className="rounded-full object-cover bg-gray-100" />
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#1A1A1A" }}>Dr. Pujari Patel <span className="font-normal text-gray-500 text-sm">(BAMS)</span></p>
                  <p style={{ fontSize: "13px", color: "#16A34A", fontWeight: 600 }}>Medical Director</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Story — responsive layout */}
          {/* Mobile: side-by-side compact | Desktop: 2-column grid */}
          <div className="lg:hidden flex items-start gap-4" data-anim="fade-up">
            {/* Compact thumbnail on mobile */}
            <div className="flex-shrink-0" style={{ width: "100px", height: "120px", position: "relative", borderRadius: "14px", overflow: "hidden" }}>
              <Image src="/hospital-front.jpeg" alt="Hospital" fill className="object-cover" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Our Story</span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                  Why Choose <span className="text-[#16A34A]">Ashish Hospital</span>
                </h2>
              </div>
              <p style={{ fontSize: "13px", color: "#555555", lineHeight: 1.6, marginBottom: "12px" }}>
                Founded with a vision to bring quality healthcare closer to home — serving thousands every year.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Patient-centered care", "Modern equipment", "Qualified specialists", "24/7 emergency services"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ marginBottom: "6px", fontSize: "12px", color: "#555555" }}>
                    <span style={{ color: "#16A34A", fontWeight: 700 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: original 2-column layout */}
          <div className="hidden lg:grid lg:grid-cols-2 items-center" style={{ gap: "60px" }} aria-hidden="true">
            <div data-anim="fade-up">
              <Image src="/hospital-front.jpeg" alt="Hospital" width={600} height={420} className="w-full h-auto" style={{ borderRadius: "20px" }} />
            </div>
            <div data-anim="fade-up" data-stagger="2">
              <div className="flex flex-col gap-1 mb-6">
                <span className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Our Story</span>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  Why Choose Ashish <span className="text-[#16A34A]">Hospital</span>
                </h2>
              </div>
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
        </div>
      </section>

      <section id="doctors" className="px-5 md:px-12 lg:px-20 py-10 md:py-16 lg:py-20" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-wrap items-end justify-between gap-4" style={{ marginBottom: "32px" }}>
            <div className="flex flex-col gap-1" data-anim="fade-up">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Our Doctors</span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Meet Our Expert Medical <span className="text-[#16A34A]">Team</span>
              </h2>
            </div>
          </div>
          <DoctorsSection />
        </div>
      </section>

      <section id="services" className="px-5 md:px-12 lg:px-20 py-10 md:py-16 lg:py-20" style={{ background: "#FAFAFA" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-wrap items-end justify-between gap-4" style={{ marginBottom: "clamp(20px, 5vw, 40px)" }}>
            <div className="flex flex-col gap-1" data-anim="fade-up">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Our Departments</span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Explore Our Medical <span className="text-[#16A34A]">Departments</span>
              </h2>
            </div>
          </div>

          <div 
            className="flex lg:grid lg:grid-cols-3 gap-3 sm:gap-5 overflow-x-auto overflow-y-hidden lg:overflow-x-visible lg:overflow-y-visible snap-x snap-mandatory hide-scrollbar py-4 -mx-5 px-5 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {departments.map((dept, i) => (
              <div
                key={dept.id}
                className="card-hoverable flex flex-col items-start gap-2 flex-shrink-0 w-[calc(46%-4px)] lg:w-full snap-start"
                data-anim="fade-up"
                data-stagger={`${(i % 3) + 1}`}
                style={{ 
                  background: "#FFFFFF", 
                  border: "1px solid #E8E8E8", 
                  borderRadius: "12px", 
                  padding: "12px", 
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: "32px", height: "32px", background: "#F3E5F5", borderRadius: "8px" }}>
                  <DeptIcon id={dept.iconId} />
                </div>
                <div>
                  <h3 className="font-heading" style={{ fontSize: "12px", fontWeight: 700, color: "#1A1A1A", marginBottom: "2px" }}>{dept.name}</h3>
                  <p style={{ fontSize: "10px", color: "#888888", lineHeight: 1.3 }}>{dept.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Facilities — compact sub-section, no huge heading gap */}
          <div style={{ borderTop: "1px solid #e9e9e9ff", marginTop: "clamp(20px, 5vw, 60px)", paddingTop: "clamp(16px, 4vw, 40px)" }}>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-4 sm:mb-6">Facilities &amp; Equipment</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {facilities.map((fac, i) => (
              <div key={i} className="card-hoverable flex items-start gap-2" data-anim="fade-up" data-stagger={`${i + 1}`} style={{ background: "white", border: "1px solid #E8E8E8", borderRadius: "10px", padding: "10px" }}>
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: "26px", height: "26px", background: "#bcd6c4ff", borderRadius: "50%" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <div>
                  <h3 className="font-heading" style={{ fontSize: "11px", fontWeight: 700, color: "#1A1A1A", marginBottom: "2px" }}>{fac.title}</h3>
                  <p className="hidden sm:block" style={{ fontSize: "10px", color: "#888888", lineHeight: 1.3 }}>{fac.description}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 md:px-12 lg:px-20 py-10 md:py-16 lg:py-20" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <div className="flex flex-col items-center gap-1 mb-2" data-anim="fade-up">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Gallery</span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Our Hospital In <span className="text-[#16A34A]">Pictures</span>
              </h2>
            </div>
          </div>

          {gallery.length > 0 ? (
            <GalleryCarousel gallery={gallery} />
          ) : (
            <div className="text-center" style={{ padding: "60px 0" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto" style={{ marginBottom: "16px" }}>
                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="13" r="3" stroke="#888888" strokeWidth="1.5" />
              </svg>
              <p style={{ fontSize: "18px", color: "#888888" }}>Gallery coming soon</p>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="px-5 md:px-12 lg:px-20 py-8 md:py-16 lg:py-20" style={{ background: "#FAFAFA" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-col gap-1 mb-6 sm:mb-8" data-anim="fade-up">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Contact Us</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Get in Touch with <span className="text-[#16A34A]">Ashish Hospital</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(16px, 4vw, 60px)" }}>
            {/* LEFT — Info: compact 2-col pill grid on mobile */}
            <div data-anim="fade-up">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-3">
                {[
                  { title: "Call Us", value: "+91 9792133555", icon: "phone", color: "#007AFF", bg: "#E5F1FF", full: false },
                  { title: "WhatsApp", value: "9792133555", icon: "wa", color: "#25D366", bg: "#E9FBF0", full: false },
                  { title: "Email Us", value: "ashishhospital555@gmail.com", icon: "email", color: "#8B5CF6", bg: "#F3E8FF", full: true },
                  { title: "Location", value: "Markadi gate, Pidra road, Rudrapur, UP", icon: "pin", color: "#EF4444", bg: "#FEE2E2", full: true },
                ].map((c, i) => (
                  <div 
                    key={i} 
                    className={`group flex items-center gap-2 sm:gap-4 bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden ${c.full ? 'col-span-2' : ''}`} 
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: c.bg, color: c.color }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                        {c.icon === "phone" && <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />}
                        {c.icon === "wa" && <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />}
                        {c.icon === "email" && <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />}
                        {c.icon === "pin" && <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />}
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] sm:text-[11px] font-bold text-[#888888] uppercase tracking-[0.5px] mb-[1px] sm:mb-[2px] truncate">{c.title}</p>
                      <p className="text-[11px] sm:text-[14px] font-semibold text-[#1A1A1A] leading-[1.2] sm:leading-[1.3] truncate">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Google Map Embed */}
            <div data-anim="fade-up" data-stagger="2" style={{ height: "100%", minHeight: "clamp(180px, 45vw, 400px)" }}>
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8E8E8] overflow-hidden" style={{ height: "100%", width: "100%" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3570.3526022680085!2d83.792411!3d26.508782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993d77381cfde31%3A0xb27a6a0ea30f6258!2sAshish%20hospital%20-%20Dr.%20Pujari!5e0!3m2!1sen!2sin!4v1777374190269!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "clamp(180px, 45vw, 400px)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ashish Hospital Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ REVIEWS ═══════════════════════════ */}
      <section id="reviews" className="px-5 md:px-12 lg:px-20 py-8 md:py-16 lg:py-20" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-row justify-between items-center mb-6 px-5 gap-2">
            <div className="flex flex-col gap-1 text-left" data-anim="fade-up">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Patient Testimonials</span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                What Our <span className="text-[#16A34A]">Patients Say</span>
              </h2>
            </div>
            <div data-anim="fade-up" style={{ animationDelay: "0.2s" }}>
              <ReviewForm />
            </div>
          </div>

          <div 
            className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar items-stretch"
            style={{ 
              scrollbarWidth: "none",
              paddingLeft: "clamp(0px, 5vw, 20px)",
              paddingRight: "clamp(0px, 5vw, 20px)"
            }}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(reviewsData as any[]).filter((r) => r.approved !== false).map((review) => (
              <div key={review.id} className="snap-center flex" style={{ minWidth: "260px", flex: "0 0 280px", display: "flex", flexDirection: "column" }}>
                <ReviewCard 
                  name={review.name} 
                  rating={review.rating} 
                  text={review.text} 
                  date={review.date} 
                  avatar={review.avatar}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FINAL CTA ═══════════════════════════ */}
      <section className="px-5 md:px-12 lg:px-20 pb-10 md:pb-16 lg:pb-20" style={{ background: "#FAFAFA" }}>
        <div className="mx-auto relative overflow-hidden" data-anim="scale-in" style={{ maxWidth: "1280px", background: "linear-gradient(to right, #16A34A, #15803D)", borderRadius: "20px", padding: "clamp(32px, 6vw, 48px) clamp(24px, 5vw, 56px)" }}>
          <div className="absolute pointer-events-none" style={{ right: "-60px", top: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div className="absolute pointer-events-none" style={{ right: "80px", bottom: "-80px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <h2 className="font-heading" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "white", lineHeight: 1.4, maxWidth: "520px" }}>
              Experience top-quality healthcare at <span style={{ color: "#F0FDF4" /* purple-very-light equivalent for green */, borderBottom: "2px solid #86EFAC" }}>Ashish Hospital</span>. Schedule your appointment today!
            </h2>
            <AppointmentModal>
              <button className="inline-flex items-center gap-2 hover:bg-purple-very-light" style={{ background: "white", color: "#16A34A", borderRadius: "999px", padding: "14px 28px", fontSize: "14px", fontWeight: 600, transition: "background 0.2s", flexShrink: 0 }}>
                Make an Appointment
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </AppointmentModal>
          </div>
        </div>
      </section>
    </>
  );
}
