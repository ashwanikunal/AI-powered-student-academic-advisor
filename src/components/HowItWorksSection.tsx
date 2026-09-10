"use client";

import React from "react";
import { UserPlus, Cpu, Sparkles, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Set Your Profile & Goals",
    subtitle: "Quick setup",
    description: "Input your degree, branch, current semester, target GPA, course weaknesses, and dream career target roles.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "AI Analyzes Your Gaps",
    subtitle: "Intelligent evaluation",
    description: "Our multi-provider AI engine evaluates your syllabus timeline and target role skill requirements in seconds.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Execute Adaptive Tasks",
    subtitle: "Daily execution",
    description: "Follow customized daily study sessions, optimize ATS resume keywords, and practice interactive mock interviews.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Track & Secure Offers",
    subtitle: "Campus readiness",
    description: "Watch your placement readiness score increase and walk into campus placement drives with 100% confidence.",
    icon: Trophy,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-20 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-soft)]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="badge-liquid inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>Simple Workflow</span>
        </div>
        <h2 className="section-heading">
          How Sarathi.ai Works in{" "}
          <span className="font-serif-italic font-normal text-[var(--muted)]">4 simple steps.</span>
        </h2>
        <p className="section-subheading">
          A clear, systematic workflow designed to guide you from initial course planning straight to your dream job offer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="glass-card p-6 flex flex-col justify-between relative group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-[2px] bg-[var(--border-soft)] z-10 group-hover:bg-indigo-500/50 transition-colors" />
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[var(--badge-bg)] text-[var(--text)] border border-[var(--border-soft)]">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--badge-bg)] text-[var(--text)] border border-[var(--border-soft)] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <span className="text-xs font-medium text-indigo-500 uppercase tracking-wider block mb-1">
                  {step.subtitle}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-soft)] text-xs text-[var(--muted)] font-mono">
                Step {index + 1} of {steps.length}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
