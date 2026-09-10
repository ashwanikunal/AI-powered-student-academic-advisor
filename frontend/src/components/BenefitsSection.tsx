"use client";

import React from "react";
import {
  Calendar,
  FileText,
  Mic,
  BarChart3,
  Target,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Adaptive Study Roadmaps",
    description: "Dynamic daily schedules calculated automatically based on upcoming exam dates, course difficulty, and your personal energy levels.",
  },
  {
    icon: FileText,
    title: "AI Resume & ATS Optimizer",
    description: "Evaluate your resume against target tech roles with real-time keyword matching and quantified achievement improvements.",
  },
  {
    icon: Mic,
    title: "Interactive Mock Interviews",
    description: "Practice technical and behavioral rounds with intelligent AI probing, instant response scoring, and STAR framework feedback.",
  },
  {
    icon: BarChart3,
    title: "Placement Readiness Matrix",
    description: "Track your placement readiness score in real-time with granular skill gap comparisons against top industry roles.",
  },
  {
    icon: Target,
    title: "Subject Weakness Elimination",
    description: "Identify challenging course topics and systematically turn academic weak spots into high-scoring strengths.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Secure by Design",
    description: "Your academic history, career targets, and uploaded resumes remain completely private and protected at all times.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative z-20 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-soft)]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="badge-liquid inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="section-heading">
          Everything you need to excel,{" "}
          <span className="font-serif-italic font-normal text-[var(--muted)]">without complexity.</span>
        </h2>
        <p className="section-subheading">
          Sarathi.ai combines intelligent academic scheduling, ATS resume analysis, and placement preparation into one seamless platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-card p-7 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--badge-bg)] text-[var(--text)] border border-[var(--border-soft)] mb-5 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-soft)] flex items-center text-xs font-medium text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
                <span>Learn more</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
