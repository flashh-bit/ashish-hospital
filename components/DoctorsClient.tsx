"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { doctors } from "@/data/doctors";

const specialities = ["All", ...Array.from(new Set(doctors.map((d) => d.speciality)))];

export default function DoctorsClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? doctors
      : doctors.filter((d) => d.speciality === activeFilter);

  return (
    <>
      <PageHeader
        badge="Our Doctors"
        title={<>Meet Our Expert Medical <span className="text-purple">Team</span></>}
        description="Our qualified specialists are committed to your health and well-being."
        imageSrc="https://picsum.photos/420/380?random=30"
        imageAlt="Medical team"
        pills={[
          { text: "Qualified Experts", position: "top-left"    },
          { text: "24/7 Care",         position: "bottom-right" },
        ]}
      />

      {/* Filter Bar */}
      <div className="px-5 md:px-12 lg:px-20" style={{ background: "white", borderBottom: "1px solid #E8E8E8", paddingTop: "16px", paddingBottom: "16px" }}>
        <div className="mx-auto flex gap-3 overflow-x-auto pb-1" style={{ maxWidth: "1280px" }}>
          {specialities.map((sp) => (
            <button
              key={sp}
              onClick={() => setActiveFilter(sp)}
              style={{
                border: activeFilter === sp ? "1px solid #16A34A" : "1px solid #E8E8E8",
                borderRadius: "999px",
                padding: "8px 18px",
                fontSize: "13px",
                color: activeFilter === sp ? "white" : "#555555",
                background: activeFilter === sp ? "#16A34A" : "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <section className="px-5 md:px-12 lg:px-20 py-10 md:py-16" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4" style={{ maxWidth: "1280px", gap: "12px" }}>
          {filtered.map((doc) => (
            <div key={doc.id} className="card-hoverable" style={{ background: "white", border: "1px solid #E8E8E8", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", position: "relative", background: "#F3E5F5" }}>
                <Image src={doc.imagePath} alt={doc.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-heading" style={{ fontSize: "clamp(13px, 3vw, 16px)", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.2 }}>{doc.name}</h3>
                <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#16A34A", marginTop: "3px" }}>{doc.speciality}</p>
                <div style={{ height: "1px", background: "#F0F0F0", margin: "8px 0" }} />
                <p style={{ fontSize: "clamp(10px, 2vw, 12px)", color: "#888888", marginBottom: "3px" }}>
                  {doc.availableDays.map(d => d.slice(0, 3)).join(", ")}
                </p>
                <p style={{ fontSize: "clamp(10px, 2vw, 12px)", color: "#555555" }}>{doc.timings}</p>
                <Link href="/contact" className="arrow-link" style={{ fontSize: "clamp(11px, 2.5vw, 13px)", fontWeight: 600, color: "#16A34A", marginTop: "10px", display: "inline-flex" }}>
                  Book →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "#888888", fontSize: "18px", padding: "48px 0" }}>
            No doctors found for this speciality.
          </p>
        )}
      </section>
    </>
  );
}
