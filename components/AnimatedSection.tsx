"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure the new page components have mounted to the DOM
    const timeoutId = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll("[data-anim]")) as HTMLElement[];

      const checkVisibility = () => {
        const triggerBottom = window.innerHeight + 150;
        elements.forEach((el) => {
          if (!el.classList.contains("visible")) {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerBottom) {
              const stagger = el.dataset.stagger;
              if (stagger) {
                el.style.transitionDelay = `${parseInt(stagger) * 0.08}s`;
              }
              el.classList.add("visible");
            }
          }
        });
      };

      // Run immediately and on scroll
      checkVisibility();
      window.addEventListener("scroll", checkVisibility, { passive: true });

      return () => window.removeEventListener("scroll", checkVisibility);
    }, 100); // 100ms delay

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <>{children}</>;
}
