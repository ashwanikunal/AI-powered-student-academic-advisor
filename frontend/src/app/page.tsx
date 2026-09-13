"use client";
// Page main entry

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import CrowdCanvas from "@/components/CrowdCanvas";
import ThemeToggle from "@/components/ThemeToggle";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import PricingSection from "@/components/PricingSection";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Appearance cleanup handler for animation fallback
    const elements = document.querySelectorAll(".appear");
    elements.forEach((el) => {
      el.addEventListener(
        "animationend",
        () => {
          el.classList.add("is-in");
        },
        { once: true }
      );
    });

    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add("is-in"));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`page relative z-10 flex flex-col justify-between min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 ${
        menuOpen ? "menu-open" : ""
      }`}
    >


      {/* Mobile Menu Backdrop */}
      <div
        className={`menu-backdrop fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* 3-Column Header Grid */}
      <header className="header sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-soft)] transition-colors duration-300 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center px-6 md:px-10 py-4 w-full max-w-7xl mx-auto">
          {/* Left: Logo */}
          <div className="justify-self-start">
            <Link
              href="/"
              className="logo appear appear--scale inline-flex items-center gap-2 text-[15.5px] font-semibold tracking-tight text-[var(--text)]"
              aria-label="Sarathi.ai"
            >
              <svg
                width={22}
                height={22}
                style={{ width: "22px", height: "22px", minWidth: "22px", minHeight: "22px" }}
                className="w-[22px] h-[22px] shrink-0 text-[var(--text)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g transform="rotate(-30 12 12)">
                  <circle cx="7.3" cy="3.2" r="1.45" />
                  <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                  <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                  <circle cx="16.7" cy="20.8" r="1.45" />
                </g>
              </svg>
              <span>
                Sarathi<span className="font-normal text-[var(--muted)]">.ai</span>
              </span>
            </Link>
          </div>

          {/* Center: Nav Pills (Desktop) */}
          <nav
            id="site-nav"
            aria-label="Primary"
            className="hidden md:flex items-center gap-2 justify-self-center"
          >
            <a
              href="#benefits"
              onClick={(e) => handleNavClick(e, "benefits")}
              className="nav-pill appear appear--scale"
            >
              Benefits
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "how-it-works")}
              className="nav-pill appear appear--soft"
            >
              How It Works
            </a>
            <a
              href="#faqs"
              onClick={(e) => handleNavClick(e, "faqs")}
              className="nav-pill appear appear--scale"
            >
              FAQs
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, "pricing")}
              className="nav-pill appear appear--soft"
            >
              Pricing
            </a>
          </nav>

          {/* Right: Header CTA, Theme Toggle & Burger */}
          <div className="justify-self-end flex items-center gap-3">
            <ThemeToggle className="appear appear--scale" />

            <Link
              href="/onboarding"
              className="btn-liquid btn-solid appear appear--scale font-medium text-xs md:text-sm hidden sm:inline-flex"
            >
              Start for Free
            </Link>

            {/* Mobile Burger Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] z-50 p-2"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-[var(--text)] rounded transition-transform duration-300 ${
                  menuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-[var(--text)] rounded my-[3.5px] transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-[var(--text)] rounded transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-45 bg-[var(--bg)]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 p-8">
            <a
              href="#benefits"
              onClick={(e) => handleNavClick(e, "benefits")}
              className="text-lg font-medium text-[var(--text)] hover:text-indigo-400"
            >
              Benefits
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "how-it-works")}
              className="text-lg font-medium text-[var(--text)] hover:text-indigo-400"
            >
              How It Works
            </a>
            <a
              href="#faqs"
              onClick={(e) => handleNavClick(e, "faqs")}
              className="text-lg font-medium text-[var(--text)] hover:text-indigo-400"
            >
              FAQs
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, "pricing")}
              className="text-lg font-medium text-[var(--text)] hover:text-indigo-400"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-[var(--border-soft)] w-full max-w-xs flex flex-col gap-4 items-center">
              <Link
                href="/onboarding"
                onClick={() => setMenuOpen(false)}
                className="btn-liquid btn-solid w-full text-center"
              >
                Start for Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section Container */}
      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-12 pb-8 border-b border-[var(--border-soft)]">
        {/* Animated Background Crowd Canvas Container */}
        <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-75 z-0 h-full w-full">
          <CrowdCanvas />
        </div>

        {/* Hero Copy */}
        <main className="hero relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 max-w-[860px] mx-auto">
          {/* Badge */}
          <div className="badge-liquid appear appear--pop inline-flex items-center gap-2">
            <svg
              width={16}
              height={16}
              style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px" }}
              className="w-4 h-4 shrink-0 fill-[var(--text)] filter drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>Operational AI Infrastructure for Students</span>
          </div>

          {/* Masked Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] text-[var(--text)] flex flex-col items-center">
            <span className="headline-line block overflow-hidden appear appear--mask">
              Train <em className="font-serif-italic font-normal text-[var(--muted)] not-italic text-[1.08em] -tracking-[0.03em] mx-1">AI agents</em> on your
            </span>
            <span className="headline-line block overflow-hidden appear appear--mask">
              academic & career journey.
            </span>
          </h1>

          {/* Lede */}
          <p className="lede appear appear--soft max-w-[540px] mt-4 text-[var(--muted)] text-sm sm:text-base font-normal leading-relaxed tracking-tight">
            Deploy adaptive AI companions that optimize study schedules, analyze resumes against ATS requirements, and prepare you for campus placement success.
          </p>

          {/* Actions */}
          <div className="hero-actions flex flex-wrap items-center justify-center gap-3 mt-7">
            <Link
              href="/onboarding"
              className="btn-liquid btn-solid hero-solid-btn appear appear--btn h-[42px] px-[18px]"
            >
              Start for Free
            </Link>
            <Link
              href="/dashboard"
              className="btn-liquid btn-hero-ghost appear appear--side h-[42px] px-[18px]"
            >
              See it in action
            </Link>
          </div>
        </main>
      </div>

      {/* Stats Banner */}
      <section className="stats relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-16 py-8 text-[var(--stat)] text-xs sm:text-sm border-b border-[var(--border-soft)] bg-[var(--card-bg)] backdrop-blur-md">
        {/* Stat 1: Study Sessions */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <svg
            width={20}
            height={20}
            style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px" }}
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="p1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
              </linearGradient>
              <linearGradient id="p2" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
              </linearGradient>
            </defs>
            <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#p1)" />
            <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#p2)" />
            <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
          </svg>
          <span>4.2M+ study sessions automated</span>
        </div>

        {/* Stat 2: Placement Score */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <svg
            width={20}
            height={20}
            style={{ width: "20px", height: "20px", minWidth: "20px", minHeight: "20px" }}
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
          >
            <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="currentColor" className="text-[var(--text)]" />
            <path
              d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85"
              stroke="var(--bg)"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>92% placement readiness boost</span>
        </div>

        {/* Stat 3: Active Students */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <svg
            width={38}
            height={21}
            style={{ width: "38px", height: "21px", minWidth: "38px", minHeight: "21px" }}
            className="w-[38px] h-[21px] shrink-0"
            viewBox="0 0 40 22"
          >
            <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
            <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
            <circle cx="8.7" cy="11" r="0.7" fill="#1a1a1a" />
            <circle cx="11.7" cy="11" r="0.7" fill="#1a1a1a" />

            <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
            <circle cx="18.2" cy="10" r="1.7" fill="#111" />
            <circle cx="22.2" cy="10" r="1.7" fill="#111" />
            <path d="M18.2 14c1 1.2 3 1.2 4 0" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
            <text x="30.2" y="15.1" fill="#fff" fontSize="12.5" fontWeight="700" textAnchor="middle">
              e
            </text>
          </svg>
          <span>180+ college branches onboarded</span>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="relative z-20 py-12 px-6 md:px-12 border-t border-[var(--border-soft)] bg-[var(--card-bg)] backdrop-blur-md text-[var(--muted)] text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text)]">Sarathi.ai</span>
            <span>— AI-Powered Student Academic & Career Advisor</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a
              href="https://github.com/ashwanikunal/AI-powered-student-academic-advisor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] hover:border-[var(--accent,#6366f1)] hover:text-[var(--text)] transition-all duration-200 text-xs font-medium group"
              aria-label="GitHub Repository - Open Source"
            >
              <Github className="w-4 h-4 text-[var(--text)] group-hover:scale-110 transition-transform duration-200" />
              <span>Open Source</span>
            </a>
            <p>© {new Date().getFullYear()} Sarathi.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
