import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Instrument Serif", "Times New Roman", "Times", "serif"],
      },
      colors: {
        background: "var(--bg, #000000)",
        foreground: "var(--text, #ffffff)",
        muted: {
          DEFAULT: "var(--muted, #9a9a9a)",
          foreground: "#888888",
        },
        stat: "var(--stat, #d8d8d8)",
        border: {
          DEFAULT: "var(--border, rgba(255, 255, 255, 0.16))",
          soft: "var(--border-soft, rgba(255, 255, 255, 0.12))",
        },
        card: {
          DEFAULT: "#09090b",
          foreground: "#f4f4f5",
        },
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#27272a",
          foreground: "#fafafa",
        },
        accent: {
          DEFAULT: "#3f3f46",
          foreground: "#fafafa",
        },
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
      },
      keyframes: {
        "in-scale": {
          "0%": { opacity: "0", transform: "scale(0.84)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "in-soft": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "in-mask": {
          "0%": { opacity: "0", transform: "translateY(40%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "in-pop": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "70%": { transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "in-btn": {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.94)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "in-side": {
          "0%": { opacity: "0", transform: "translateX(22px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "in-stat": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "in-scale": "in-scale 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
        "in-soft": "in-soft 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
        "in-mask": "in-mask 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
        "in-pop": "in-pop 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
        "in-btn": "in-btn 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
        "in-side": "in-side 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
        "in-stat": "in-stat 1.05s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
