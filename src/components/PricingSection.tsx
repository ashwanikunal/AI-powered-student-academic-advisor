"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter Student",
    price: "₹0",
    period: "Forever Free",
    description: "Essential AI study planning and basic career assessment for every student.",
    badge: null,
    highlighted: false,
    features: [
      "Personalized Academic Onboarding",
      "Adaptive Daily Study Schedule Engine",
      "Basic ATS Resume Score & Keyword Scan",
      "3 AI Mock Interview Sessions / month",
      "Subject Weakness & Topic Priority Tracker",
    ],
    ctaText: "Start for Free",
    ctaHref: "/onboarding",
    btnStyle: "btn-ghost",
  },
  {
    name: "Pro Scholar",
    price: "₹0",
    period: "Free during Open Beta",
    description: "Complete operational AI power for students aiming for top campus placement offers.",
    badge: "Recommended",
    highlighted: true,
    features: [
      "Everything in Starter Student",
      "Unlimited AI Advisor Chat & Custom Roadmaps",
      "Advanced ATS Resume Match & Bullet Point Rewriter",
      "Unlimited AI Mock Interviews with STAR Feedback",
      "Real-time Career Placement Readiness Radar",
      "Priority AI Response Speed & Zero-Wait Generation",
    ],
    ctaText: "Get Pro Access",
    ctaHref: "/onboarding",
    btnStyle: "btn-solid",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative z-20 py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-[var(--border-soft)]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="badge-liquid inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Student First</span>
        </div>
        <h2 className="section-heading">
          Transparent, Student-First{" "}
          <span className="font-serif-italic font-normal text-[var(--muted)]">Pricing.</span>
        </h2>
        <p className="section-subheading">
          Sarathi.ai is 100% free for students to build roadmaps, analyze resumes, and prepare for campus placement drives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`glass-card p-8 flex flex-col justify-between relative transition-all duration-300 ${
              plan.highlighted
                ? "border-2 border-indigo-500/60 shadow-[0_0_40px_rgba(99,102,241,0.15)] md:-translate-y-2"
                : ""
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{plan.badge}</span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-[var(--text)] tracking-tight mb-2">
                {plan.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] mb-6 min-h-[40px]">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[var(--border-soft)]">
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs font-medium text-[var(--muted)]">
                  / {plan.period}
                </span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text)]">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.ctaHref}
              className={`btn-liquid ${plan.btnStyle} w-full text-sm font-semibold h-11`}
            >
              {plan.ctaText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
