import type { Metadata } from "next";
import Image from "next/image";
import AppointmentForm from "@/components/AppointmentForm";
import ReviewForm from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Contact Us — Ashish Hospital",
  description:
    "Get in touch with Ashish Hospital. Book an appointment, find our location, view OPD timings, and reach us via phone or WhatsApp.",
  alternates: {
    canonical: "https://ashishhospital.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero — Floating Image Layout */}
      <section style={{ background: "#FFFFFF", padding: "80px 80px 60px" }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center" style={{ maxWidth: "1280px", gap: "60px" }}>
          {/* LEFT — Image */}
          <div className="relative hero-image-anim order-2 lg:order-1" style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
            <Image src="https://picsum.photos/420/380?random=35" alt="Doctors working" width={420} height={380} className="w-full object-cover" style={{ height: "380px" }} priority />
            {[
              { text: "Pediatrics", top: "15%", left: "-20px", cls: "pill-animate pill-animate-1 float-pill-1" },
              { text: "General Medicine", top: "30%", right: "-20px", cls: "pill-animate pill-animate-2 float-pill-2" },
              { text: "Cardiology", bottom: "15%", left: "20px", cls: "pill-animate pill-animate-3 float-pill-3" },
            ].map((pill, i) => (
              <div key={i} className={`absolute flex items-center gap-2 ${pill.cls}`} style={{ top: pill.top, bottom: pill.bottom, left: pill.left, right: pill.right, background: "white", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "10px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", zIndex: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" /></svg>
                {pill.text}
              </div>
            ))}
          </div>
          {/* RIGHT — Title */}
          <div className="order-1 lg:order-2">
            <div className="hero-fade-1 inline-block" style={{ border: "1px solid #E8E8E8", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "#888888", marginBottom: "20px" }}>Contact</div>
            <h1 className="font-heading hero-fade-2" style={{ fontSize: "clamp(36px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.08, color: "#1A1A1A" }}>
              Get in Touch with <span className="text-purple">Ashish Hospital</span>
            </h1>
            <p className="hero-fade-3" style={{ fontSize: "16px", color: "#555555", lineHeight: 1.7, maxWidth: "440px", marginTop: "16px" }}>
              We are here to assist you with all your healthcare needs. Contact us through any of our locations or reach out for emergency support.
            </p>
          </div>
        </div>
      </section>

      {/* Location Card */}
      <section style={{ padding: "64px 80px", background: "#FFFFFF" }}>
        <div className="mx-auto" style={{ maxWidth: "1280px" }}>
          <h2 className="font-heading" data-anim="fade-up" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "32px" }}>
            Our <span className="text-purple">Locations</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "20px" }}>
            <div data-anim="fade-up" style={{ background: "white", border: "1px solid #E8E8E8", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image src="https://picsum.photos/600/200?random=36" alt="Hospital" fill className="object-cover" />
                <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.92)", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>
                  Ashish Hospital Main
                </div>
              </div>
              <div style={{ padding: "20px" }}>
                {[
                  { icon: "pin", text: "Markadi gate, Pidra road, Rudrapur, Deoria, Uttar Pradesh" },
                  { icon: "phone", text: "+91 9792133555" },
                  { icon: "email", text: "ashishhospital555@gmail.com" },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-[10px]" style={{ marginBottom: "10px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                      {info.icon === "pin" && <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#16A34A" />}
                      {info.icon === "phone" && <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#16A34A" />}
                      {info.icon === "email" && <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#16A34A" />}
                    </svg>
                    <span style={{ fontSize: "14px", color: "#555555" }}>{info.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section style={{ background: "#FAFAFA", padding: "64px 80px" }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: "1280px", gap: "60px" }}>
          {/* LEFT — Info */}
          <div data-anim="fade-up">
            <h2 className="font-heading" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#1A1A1A" }}>
              Book an <span className="text-purple">Appointment</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#555555", marginTop: "8px", marginBottom: "32px" }}>
              Fill in the form and we&apos;ll get back to you shortly.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "+91 9792133555", icon: "phone" },
                { label: "+91 9792133555", icon: "wa" },
                { label: "ashishhospital555@gmail.com", icon: "email" },
                { label: "Markadi gate, Pidra road, Rudrapur, Deoria, Uttar Pradesh", icon: "pin" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A">
                    {c.icon === "phone" && <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />}
                    {c.icon === "wa" && <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />}
                    {c.icon === "email" && <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />}
                    {c.icon === "pin" && <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />}
                  </svg>
                  <span style={{ fontSize: "15px", color: "#555555" }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div data-anim="fade-up" data-stagger="2">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section style={{ background: "#FFFFFF", padding: "64px 80px" }}>
        <div className="mx-auto" style={{ maxWidth: "700px", textAlign: "center" }}>
          <h2 className="font-heading" data-anim="fade-up" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "32px" }}>
            Share Your <span className="text-purple">Experience</span>
          </h2>
          <div data-anim="fade-up" data-stagger="1">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
