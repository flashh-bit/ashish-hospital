import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#16A34A",
          hover: "#15803D",
          light: "#86EFAC",
          "very-light": "#F0FDF4",
          cta: "#22C55E",
        },
        dark: "#1A1A1A",
        medium: "#555555",
        light: "#888888",
        border: "#E8E8E8",
        "input-border": "#D0D0D0",
        "off-white": "#FAFAFA",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "hero-h1": ["56px", { lineHeight: "1.1", fontWeight: "800" }],
        "section-h2": ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-h3": ["18px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["17px", { lineHeight: "1.7" }],
        "body-sm": ["13px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 32px rgba(155,89,182,0.12)",
        nav: "0 1px 8px rgba(0,0,0,0.06)",
        float: "0 8px 24px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
