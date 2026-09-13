"use client";
// Page main entry

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Sparkles, TrendingUp, GraduationCap } from "lucide-react";
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
            <a
              href="https://github.com/ashwanikunal/AI-powered-student-academic-advisor"
              target="_blank"
              rel="noopener noreferrer"
              className="appear appear--scale flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--card-bg)] hover:bg-[var(--pill-hover-bg)] text-[var(--text)] transition-all text-xs font-medium"
              aria-label="GitHub repository - Open Source"
            >
              <Github className="w-4 h-4 text-[var(--text)]" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

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
      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-10 pb-12 border-b border-[var(--border-soft)]">
        {/* Animated Background Crowd Canvas Container */}
        <div className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-85 z-0 h-full w-full">
          <CrowdCanvas />
        </div>

        {/* Hero Copy with Blue Glassmorphism Effect */}
        <main className="hero relative z-10 flex flex-col items-center justify-center text-center px-6 py-10 sm:py-12 max-w-[880px] mx-auto rounded-3xl backdrop-blur-md bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(10,12,18,0.55)] border border-blue-500/20 dark:border-blue-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(37,99,235,0.15)] transition-all duration-300">
          {/* Badge */}
          <div className="badge-liquid appear appear--pop inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium px-3.5 py-1 rounded-full">
            <svg
              width={16}
              height={16}
              style={{ width: "16px", height: "16px", minWidth: "16px", minHeight: "16px" }}
              className="w-4 h-4 shrink-0 fill-blue-600 dark:fill-blue-400 filter drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>Operational AI Infrastructure for Students</span>
          </div>

          {/* Masked Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] text-[var(--text)] flex flex-col items-center mt-3">
            <span className="headline-line block overflow-hidden appear appear--mask">
              Train <em className="font-serif-italic font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 bg-clip-text text-transparent not-italic text-[1.08em] -tracking-[0.03em] mx-1">AI agents</em> on your
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
              className="btn-liquid btn-solid hero-solid-btn appear appear--btn h-[42px] px-[18px] !bg-gradient-to-r !from-blue-600 !via-indigo-600 !to-blue-700 !text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium text-[var(--text)]">4.2M+ study sessions automated</span>
        </div>

        {/* Stat 2: Placement Score */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-medium text-[var(--text)]">92% placement readiness boost</span>
        </div>

        {/* Stat 3: Active Students */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="font-medium text-[var(--text)]">180+ college branches onboarded</span>
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
      <footer className="relative z-20 py-10 px-6 md:px-12 border-t border-[var(--border-soft)] bg-[var(--card-bg)] backdrop-blur-md text-[var(--muted)] text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span className="font-bold text-[var(--text)] text-sm sm:text-base tracking-tight">Sarathi.ai</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">• Open Source</span>
            <span>• AI-Powered Student Academic & Career Advisor</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a
              href="https://github.com/ashwanikunal/AI-powered-student-academic-advisor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-all text-xs font-semibold group"
              aria-label="GitHub Repository - Open Source"
            >
              <Github className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              <span>GitHub Repository</span>
            </a>
            <p>© {new Date().getFullYear()} Sarathi.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
