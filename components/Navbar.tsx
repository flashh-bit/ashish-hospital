"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AppointmentModal from "./AppointmentModal";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#doctors", label: "Doctors" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const pathname = usePathname();

  // Smooth scroll handler
  const scrollTo = useCallback((hash: string) => {
    setMobileOpen(false);
    // If not on the homepage, navigate there first
    if (pathname !== "/") {
      window.location.href = "/" + hash;
      return;
    }
    const el = document.querySelector(hash);
    if (el) {
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [pathname]);

  // Track scroll position to highlight active nav link
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = navLinks.map((l) => l.href);
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.querySelector(sectionIds[i]);
        if (el && (el as HTMLElement).offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed w-[calc(100%-24px)] md:w-full z-[1000] top-3 mx-3 md:top-0 md:mx-0 rounded-2xl md:rounded-none overflow-hidden bg-[#ECFDF5]/40 md:bg-[#ECFDF5]/65 border border-[#86EFAC]/35 md:border-t-0 md:border-l-0 md:border-r-0 md:border-b transition-all duration-300"
      style={{
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
        boxShadow: "0 4px 24px rgba(22, 163, 74, 0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      <nav
        className="flex items-center justify-between mx-auto px-5 md:px-12"
        style={{
          height: "64px",
          maxWidth: "1280px",
        }}
      >
        {/* LEFT — Logo */}
        <Link href="/" className="flex items-center gap-[12px]">
          <Image
            src="/logo.png"
            alt="Ashish Hospital Logo"
            width={200}
            height={60}
            className="object-contain h-[100px] w-auto"
            priority
          />
          <span
            className="font-heading"
            style={{ fontSize: "22px", fontWeight: 800, color: "#111111", letterSpacing: "-0.5px", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
          >
            Ashish Hospital
          </span>
        </Link>

        {/* CENTER — Nav Links (desktop) */}
        <div className="hidden md:flex items-center" style={{ gap: "32px" }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-link ${activeSection === link.href ? "active" : ""}`}
              style={{
                fontSize: "14px",
                fontWeight: activeSection === link.href ? 700 : 500,
                color: activeSection === link.href ? "#1A1A1A" : "#555555",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* RIGHT — Actions (desktop) */}
        <div className="hidden md:flex items-center" style={{ gap: "16px" }}>
          <AppointmentModal>
            <button
              className="inline-flex items-center hover:bg-purple-hover"
              style={{
                gap: "8px",
                background: "#16A34A",
                color: "white",
                padding: "10px 20px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 600,
                transition: "background 0.2s",
                border: "none",
                cursor: "pointer",
              }}
              id="nav-appointment-btn"
            >
              Appointment

              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.33 8h9.34M8.67 4l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </AppointmentModal>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center"
          style={{ width: "36px", height: "36px", gap: "5px", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle mobile menu"
          id="mobile-menu-toggle"
        >
          <span className="block" style={{ width: "22px", height: "2px", background: "#1A1A1A", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span className="block" style={{ width: "22px", height: "2px", background: "#1A1A1A", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
          <span className="block" style={{ width: "22px", height: "2px", background: "#1A1A1A", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className="md:hidden"
        style={{
          maxHeight: mobileOpen ? "400px" : "0",
          opacity: mobileOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
          background: "transparent", // Inherit glass from parent header
          borderTop: mobileOpen ? "1px solid rgba(22, 163, 74, 0.1)" : "none",
          borderBottom: mobileOpen ? "1px solid rgba(22, 163, 74, 0.1)" : "none",
          boxShadow: mobileOpen ? "0 10px 30px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div style={{ padding: "16px 20px" }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left"
              style={{
                padding: "14px 0",
                borderBottom: "1px solid rgba(22, 163, 74, 0.1)", // Subtle green border
                fontSize: "15px",
                fontWeight: activeSection === link.href ? 700 : 500,
                color: activeSection === link.href ? "#15803D" : "#1A1A1A",
                background: "none",
                border: "none",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "rgba(22, 163, 74, 0.1)",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <AppointmentModal>
            <button
              className="block text-center w-full"
              style={{
                marginTop: "16px",
                background: "#16A34A",
                color: "white",
                padding: "12px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Appointment →
            </button>
          </AppointmentModal>
        </div>
      </div>
    </header>
  );
}
