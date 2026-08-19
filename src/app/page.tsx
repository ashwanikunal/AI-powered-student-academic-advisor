"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CrowdCanvas from "@/components/CrowdCanvas";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Add appearance cleanup handler for animation fallback
    const elements = document.querySelectorAll(".appear");
    elements.forEach((el) => {
      el.addEventListener("animationend", () => {
        el.classList.add("is-in");
      }, { once: true });
    });

    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add("is-in"));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={`page desktop-lock relative z-10 flex flex-col justify-between min-h-screen bg-black text-white ${menuOpen ? 'menu-open' : ''}`}>
      {/* Background scrim / photo container */}
      <div className="hero-photo fixed inset-0 pointer-events-none z-0 bg-black" />

      {/* Mobile Menu Backdrop */}
      <div
        className={`menu-backdrop fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* 3-Column Header Grid */}
      <header className="header relative z-50 grid grid-cols-3 items-center px-6 md:px-10 py-5 w-full max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="justify-self-start">
          <Link
            href="/"
            className="logo appear appear--scale inline-flex items-center gap-2 text-[15.5px] font-semibold tracking-tight text-white"
            aria-label="Vesper.ai"
          >
            <svg
              className="w-[22px] h-[22px]"
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
              Vesper<span className="font-normal text-muted-foreground">.ai</span>
            </span>
          </Link>
        </div>

        {/* Center: Nav Pills */}
        <nav
          id="site-nav"
          aria-label="Primary"
          className={`hidden md:flex items-center gap-2 justify-self-center ${
            menuOpen
              ? "!flex !fixed !inset-0 !z-45 !bg-black/90 !flex-col !justify-center !items-center !gap-4 !p-8"
              : ""
          }`}
        >
          <Link href="/onboarding" className="nav-pill appear appear--scale">
            Benefits
          </Link>
          <Link href="/dashboard" className="nav-pill appear appear--soft">
            How It Works
          </Link>
          <Link href="/onboarding" className="nav-pill appear appear--scale">
            FAQs
          </Link>
          <Link href="/dashboard" className="nav-pill appear appear--soft">
            Pricing
          </Link>
        </nav>

        {/* Right: Header CTA & Burger */}
        <div className="justify-self-end flex items-center gap-3">
          <Link
            href="/onboarding"
            className="btn-liquid btn-solid appear appear--scale font-medium text-xs md:text-sm"
          >
            Start for Free
          </Link>

          {/* Mobile Burger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md border border-white/20 bg-black/60 z-50 p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`w-4 h-[1.5px] bg-white rounded transition-transform duration-300 ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-white rounded my-[3.5px] transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-white rounded transition-transform duration-300 ${
                menuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero relative z-10 flex flex-col items-center justify-end text-center px-6 pb-20 pt-10 my-auto">
        <div className="hero-copy max-w-[860px] mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="badge-liquid appear appear--pop inline-flex items-center gap-2">
            <svg
              className="w-4 h-4 fill-white filter drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>Operational AI Infrastructure</span>
          </div>

          {/* Masked Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] text-white flex flex-col items-center">
            <span className="headline-line block overflow-hidden appear appear--mask">
              Train <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] -tracking-[0.03em] mx-1">AI agents</em> on your
            </span>
            <span className="headline-line block overflow-hidden appear appear--mask">
              workflows in minutes.
            </span>
          </h1>

          {/* Lede */}
          <p className="lede appear appear--soft max-w-[470px] mt-4 text-[#9a9a9a] text-sm sm:text-base font-normal leading-relaxed tracking-tight">
            Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
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
        </div>
      </main>

      {/* Interactive GSAP Crowd Canvas Background Layer */}
      <CrowdCanvas />

      {/* Stats Footer */}
      <footer className="stats relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-16 py-8 text-[#d8d8d8] text-xs sm:text-sm border-t border-white/10 bg-black/80 backdrop-blur-md">
        {/* Stat 1: Workflow Icon */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
          <span>4.2M+ workflows automated</span>
        </div>

        {/* Stat 2: Download Tile */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
            <path
              d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85"
              stroke="#111"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>92% reduction in manual operations</span>
        </div>

        {/* Stat 3: Three Avatars */}
        <div className="stat appear appear--stat inline-flex items-center gap-3">
          <svg className="w-[38px] h-[21px] shrink-0" viewBox="0 0 40 22">
            {/* Avatar 1 */}
            <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
            <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
            <circle cx="8.7" cy="11" r="0.7" fill="#1a1a1a" />
            <circle cx="11.7" cy="11" r="0.7" fill="#1a1a1a" />

            {/* Avatar 2 */}
            <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
            <circle cx="18.2" cy="10" r="1.7" fill="#111" />
            <circle cx="22.2" cy="10" r="1.7" fill="#111" />
            <path d="M18.2 14c1 1.2 3 1.2 4 0" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Avatar 3 */}
            <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
            <text x="30.2" y="15.1" fill="#fff" fontSize="12.5" fontWeight="700" textAnchor="middle">
              e
            </text>
          </svg>
          <span>180+ operational teams onboarded</span>
        </div>
      </footer>
    </div>
  );
}
