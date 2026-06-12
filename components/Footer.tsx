"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E8E8E8",
        padding: "24px 20px 24px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-[1.5fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_2fr] gap-4 sm:gap-8"
        style={{
          maxWidth: "1280px",
        }}
      >
        {/* COL 1 — Brand */}
        <div style={{ minWidth: 0 }}>
          <div className="flex items-center gap-[10px]" style={{ marginBottom: "12px" }}>
            <Image
              src="/logo.png"
              alt="Ashish Hospital Logo"
              width={140}
              height={35}
              className="object-contain h-[35px] w-auto"
            />
            <span
              className="font-heading"
              style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap" }}
            >
              Ashish Hospital
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#555555", lineHeight: 1.6 }}>
            Markadi gate, Pidra road,<br />
            Rudrapur, Deoria, Uttar Pradesh
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <p style={{ fontSize: "12px", color: "#16A34A" }}>ashishhospital555@gmail.com</p>
            <p style={{ fontSize: "12px", color: "#555555" }}>+91 9792133555</p>
          </div>
          {/* Created by credit */}
          <div style={{ marginTop: "14px" }}>
            <span style={{ fontSize: "11px", color: "#888888" }}>Created by </span>
            <a
              href="https://5lashh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flash-dev-link"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#fc1f1fff",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              Flash Dev. Co
            </a>
          </div>

        </div>

        {/* COL 2 — Navigation */}
        <div className="hidden sm:block" style={{ minWidth: 0 }}>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#1A1A1A",
              marginBottom: "14px",
            }}
          >
            Navigation
          </h4>
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {[
              { label: "Home", hash: "#home" },
              { label: "About", hash: "#about" },
              { label: "Doctors", hash: "#doctors" },
              { label: "Services", hash: "#services" },
              { label: "Gallery", hash: "#gallery" },
              { label: "Contact", hash: "#contact" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.hash)}
                style={{
                  fontSize: "12px",
                  color: "#555555",
                  transition: "color 0.2s",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                }}
                className="hover:text-purple"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* COL 3 — Legal */}
        <div style={{ minWidth: 0 }}>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#1A1A1A",
              marginBottom: "14px",
            }}
          >
            Legal
          </h4>
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {[
              { label: "Privacy Policy", hash: "/legal#privacy" },
              { label: "Terms of Service", hash: "/legal#terms" },
              { label: "Cookie Policy", hash: "/legal#cookies" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.hash}
                style={{ fontSize: "12px", color: "#555555", transition: "color 0.2s" }}
                className="hover:text-purple"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* COL 4 — Newsletter */}
        <div className="hidden lg:block" style={{ minWidth: 0 }}>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#1A1A1A",
              marginBottom: "14px",
            }}
          >
            Stay Connected
          </h4>
          <p style={{ fontSize: "12px", color: "#555555", lineHeight: 1.5, marginBottom: "12px" }}>
            Stay updated with health tips and news.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                border: "1px solid #E8E8E8",
                borderRadius: "8px 0 0 8px",
                padding: "8px 10px",
                fontSize: "12px",
                outline: "none",
              }}
            />
            <button
              style={{
                background: "#16A34A",
                color: "white",
                borderRadius: "0 8px 8px 0",
                padding: "8px 14px",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              className="hover:bg-purple-hover"
            >
              Submit
            </button>
          </div>

          <label
            className="flex items-center gap-2"
            style={{ marginTop: "8px", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              style={{ accentColor: "#16A34A", width: "14px", height: "14px" }}
            />
            <span style={{ fontSize: "11px", color: "#888888" }}>
              Accept all terms and cookies
            </span>
          </label>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mx-auto flex items-center justify-center"
        style={{
          maxWidth: "1280px",
          borderTop: "1px solid #E8E8E8",
          marginTop: "24px",
          paddingTop: "16px",
        }}
      >
        <p style={{ fontSize: "11px", color: "#888888", textAlign: "center" }}>
          © 2026 Ashish Hospital. All rights reserved.
        </p>
      </div>
      <style>{`
        @keyframes flashBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .flash-dev-link {
          animation: flashBlink 1.6s ease-in-out infinite;
        }
        .flash-dev-link:hover {
          animation: none;
          opacity: 1;
          color: #15803D;
        }
      `}</style>
    </footer>
  );
}
