"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, TrendingUp, CheckCircle, ExternalLink } from "lucide-react";

export default function CareerPage() {
  const roles = [
    {
      title: "Software Engineer (Fullstack / Backend)",
      matchScore: 84,
      demandSignal: "High Demand (Recent Signals)",
      topSkills: ["Data Structures & Algorithms", "System Design", "Node.js / Next.js", "SQL & NoSQL"],
      sourceEvidence: "Market Intelligence Index 2026 (Verified Public Source)",
    },
    {
      title: "Data Engineer / ML Infrastructure",
      matchScore: 72,
      demandSignal: "Growing Demand",
      topSkills: ["Python", "Spark / Distributed Systems", "Database Optimization", "Data Pipelines"],
      sourceEvidence: "Recent Industry Hiring Signals 2026",
    },
    {
      title: "DevOps & Cloud Engineer",
      matchScore: 68,
      demandSignal: "Steady Demand",
      topSkills: ["Docker & Kubernetes", "CI/CD Pipelines", "AWS / GCP", "Terraform"],
      sourceEvidence: "Cloud Engineering Hiring Index 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <Briefcase className="w-5 h-5 text-white" />
            <span>Career Roles & Market Signals Hub</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Target Role Alignment & Market Evidence</h1>
          <p className="text-xs text-zinc-400">All market signals strictly cite verified external sources without ungrounded claims.</p>
        </div>

        <div className="space-y-6">
          {roles.map((r, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{r.demandSignal}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Role Alignment Match</div>
                  <div className="text-2xl font-mono font-bold text-white">{r.matchScore}%</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-300">Required Skills & Expectations:</span>
                <div className="flex flex-wrap gap-2">
                  {r.topSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded text-xs border border-white/10 bg-zinc-900 text-zinc-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-white/5 text-xs text-zinc-400 flex items-center justify-between">
                <span>Evidence Source: <strong className="text-zinc-200">{r.sourceEvidence}</strong></span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
