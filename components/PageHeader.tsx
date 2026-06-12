import Image from "next/image";

interface PageHeaderProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  pills?: { text: string; position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }[];
}

export default function PageHeader({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  pills = [],
}: PageHeaderProps) {
  const positionMap: Record<string, React.CSSProperties> = {
    "top-left":     { top: "10%",    left: "-12px"  },
    "top-right":    { top: "10%",    right: "-12px"  },
    "bottom-left":  { bottom: "10%", left: "16px"   },
    "bottom-right": { bottom: "10%", right: "-12px" },
  };

  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{
          maxWidth: "1280px",
          padding: "clamp(64px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(48px, 6vw, 72px)",
          gap: "clamp(32px, 5vw, 60px)",
        }}
      >
        {/* LEFT — Image (shown below title on mobile) */}
        <div
          className="relative hero-image-anim order-2 lg:order-1 w-full"
          style={{ maxWidth: "480px", margin: "0 auto" }}
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-card" style={{ height: "clamp(240px, 40vw, 400px)" }}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </div>

          {/* Floating pills — hidden on mobile to avoid overflow */}
          {pills.map((pill, i) => (
            <div
              key={i}
              className="absolute hidden sm:flex items-center gap-2 pill-animate"
              style={{
                ...positionMap[pill.position],
                background: "white",
                border: "1px solid #E8E8E8",
                borderRadius: "12px",
                padding: "10px 16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1A1A1A",
                zIndex: 10,
                whiteSpace: "nowrap",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {pill.text}
            </div>
          ))}
        </div>

        {/* RIGHT — Copy (shown first on mobile) */}
        <div className="order-1 lg:order-2">
          <div
            className="hero-fade-1 inline-block"
            style={{
              border: "1px solid #E8E8E8",
              borderRadius: "999px",
              padding: "6px 16px",
              fontSize: "13px",
              color: "#888888",
              marginBottom: "16px",
            }}
          >
            {badge}
          </div>
          <h1
            className="font-heading hero-fade-2"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#1A1A1A",
            }}
          >
            {title}
          </h1>
          <p
            className="hero-fade-3"
            style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              color: "#555555",
              lineHeight: 1.75,
              maxWidth: "440px",
              marginTop: "16px",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
