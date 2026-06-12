"use client";

import Image from "next/image";

type PillData = {
  text: string;
  icon?: React.ReactNode;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  floatClass: string;
  animClass: string;
};

type FloatingHeroProps = {
  pageTag: string;
  title: string;
  purpleWords: string;
  subtext: string;
  imageSrc: string;
  pills: PillData[];
  children?: React.ReactNode; // Additional content below heading (stats, buttons, etc.)
};

export default function FloatingHero({
  pageTag,
  title,
  purpleWords,
  subtext,
  imageSrc,
  pills,
  children,
}: FloatingHeroProps) {
  // Split title to color the purple words
  const titleParts = title.split(purpleWords);

  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "80px 80px 60px",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{ maxWidth: "1280px", gap: "60px" }}
      >
        {/* LEFT COLUMN — Image Composition */}
        <div
          className="relative hero-image-anim order-2 lg:order-1"
          style={{ width: "100%", maxWidth: "480px", margin: "0 auto" }}
        >
          {/* Main Image */}
          <Image
            src={imageSrc}
            alt="Ashish Hospital"
            width={480}
            height={420}
            className="w-full object-cover"
            style={{ height: "420px", borderRadius: "20px" }}
            priority
          />

          {/* Floating Pill overlays */}
          {pills.map((pill, i) => (
            <div
              key={i}
              className={`absolute ${pill.floatClass} ${pill.animClass} flex items-center gap-2`}
              style={{
                ...pill.position,
                background: "white",
                border: "1px solid #E8E8E8",
                borderRadius: "12px",
                padding: "10px 16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1A1A1A",
                zIndex: 10,
              }}
            >
              {pill.icon && (
                <span
                  className="flex items-center justify-center"
                  style={{ color: "#16A34A" }}
                >
                  {pill.icon}
                </span>
              )}
              {pill.text}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN — Title Block */}
        <div className="order-1 lg:order-2">
          {/* Page Tag Pill */}
          <div
            className="hero-fade-1 inline-block"
            style={{
              background: "white",
              border: "1px solid #E8E8E8",
              borderRadius: "999px",
              padding: "6px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#888888",
              marginBottom: "20px",
            }}
          >
            {pageTag}
          </div>

          {/* H1 Heading */}
          <h1
            className="font-heading hero-fade-2"
            style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#1A1A1A",
            }}
          >
            {titleParts[0]}
            <span className="text-purple">{purpleWords}</span>
            {titleParts[1] || ""}
          </h1>

          {/* Subtext */}
          <p
            className="hero-fade-3"
            style={{
              fontSize: "16px",
              color: "#555555",
              lineHeight: 1.7,
              maxWidth: "440px",
              marginTop: "16px",
            }}
          >
            {subtext}
          </p>

          {/* Additional content slot (buttons, stat cards, etc.) */}
          {children && <div className="hero-fade-3" style={{ marginTop: "32px" }}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
