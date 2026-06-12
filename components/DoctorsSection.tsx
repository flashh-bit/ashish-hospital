"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/data/doctors";

const specialities = ["All", ...Array.from(new Set(doctors.map((d) => d.speciality)))];

export default function DoctorsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered =
    activeFilter === "All"
      ? doctors
      : doctors.filter((d) => d.speciality === activeFilter);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Find the child closest to the center
    const containerCenter = el.offsetLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    const cards = el.querySelectorAll(".doc-card");
    cards.forEach((card, index) => {
      const cardCenter = (card as HTMLElement).offsetLeft + card.clientWidth / 2 - el.scrollLeft;
      const diff = Math.abs(containerCenter - cardCenter - el.offsetLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    // reset index on filter change
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [activeFilter]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      // initial check
      checkScroll();
    }
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [checkScroll, filtered]);


  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: "32px", justifyContent: "center" }}>
        {specialities.map((sp) => {
          const displayLabel = sp === "EMT (Basic Emergency Medical Technician)" ? "EMT" : sp;
          return (
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
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Desktop Grid View (>= 768px) */}
      <div className="hidden md:flex flex-wrap justify-center items-stretch gap-8 py-8" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="flex-shrink-0 bg-white border rounded-2xl overflow-hidden transition-all hover:-translate-y-2"
            style={{ width: "260px", border: "1px solid #E8E8E8", boxShadow: "0 12px 32px rgba(22,163,74,0.08)" }}
          >
            <div style={{ width: "100%", aspectRatio: "4/5", position: "relative", background: "#F3E5F5" }}>
              <Image src={doc.imagePath} alt={doc.name} fill className="object-cover object-top" sizes="260px" />
            </div>
            <div style={{ padding: "16px" }}>
              <h3 className="font-heading" style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A" }}>{doc.name}</h3>
              <p style={{ fontSize: "13px", color: "#16A34A", marginTop: "2px" }}>{doc.speciality}</p>
              <div style={{ height: "1px", background: "#F0F0F0", margin: "12px 0" }} />
              <p style={{ fontSize: "12px", color: "#888888" }}>
                {doc.availableDays.map(d => d.slice(0, 3)).join(", ")}
              </p>
              <p style={{ fontSize: "12px", color: "#555555", marginTop: "2px" }}>{doc.timings}</p>
              <Link href="#contact" className="text-center hover:bg-green-600 transition-colors" style={{ background: "#25D366", color: "white", padding: "8px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginTop: "16px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel View (< 768px) */}
      <div className="block md:hidden relative mx-auto" style={{ maxWidth: "100%" }}>
        <div
          ref={scrollRef}
          className="doctors-scroll flex items-center"
          style={{
            gap: "16px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            paddingTop: "24px",
            paddingBottom: "24px",
            paddingLeft: "calc(50% - 130px)",
            paddingRight: "calc(50% - 130px)",
          }}
        >
          {filtered.map((doc, i) => {
            const isActive = i === activeIndex;

            // Smart availability label
            const days = doc.availableDays;
            let dayLabel = "";
            if (days.length === 7) dayLabel = "Daily";
            else if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday")) dayLabel = "Weekdays";
            else if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) dayLabel = "Weekends";
            else dayLabel = `${days.length} days/week`;

            return (
              <div
                key={doc.id}
                className="doc-card flex-shrink-0"
                style={{
                  width: "260px",
                  scrollSnapAlign: "center",
                  background: "white",
                  border: isActive ? "1.5px solid #16A34A" : "1px solid #E8E8E8",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: isActive ? "scale(1.0)" : "scale(0.88)",
                  opacity: isActive ? 1 : 0.55,
                  boxShadow: isActive ? "0 12px 32px rgba(22,163,74,0.18)" : "none",
                  zIndex: isActive ? 10 : 1,
                  filter: isActive ? "none" : "grayscale(20%)",
                }}
              >
                {/* Square image */}
                <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", background: "#F0FDF4" }}>
                  <Image src={doc.imagePath} alt={doc.name} fill className="object-cover object-top" sizes="260px" />
                </div>
                <div style={{ padding: "14px" }}>
                  <h3 className="font-heading" style={{ fontSize: "15px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2 }}>{doc.name}</h3>
                  <p style={{ fontSize: "12px", color: "#16A34A", marginTop: "3px" }}>{doc.speciality}</p>
                  <div style={{ height: "1px", background: "#F0F0F0", margin: "10px 0" }} />
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "11px", color: "#888888" }}>📅 {dayLabel}</span>
                    <span style={{ fontSize: "11px", color: "#555555" }}>{doc.timings.split(" & ")[0]}</span>
                  </div>
                  {isActive && (
                    <Link href="#contact" className="text-center" style={{ background: "#25D366", color: "white", padding: "9px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginTop: "12px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Book Now →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#888888", fontSize: "16px", padding: "40px 0" }}>
          No doctors found for this speciality.
        </p>
      )}

      {/* Inline styles for scrollbar hide & card padding desktop adjustment */}
      <style jsx>{`
        .doctors-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
