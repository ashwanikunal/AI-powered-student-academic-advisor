"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Sparkles, TrendingUp, Plus } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState([
    { id: "1", name: "Data Structures & Algorithms", category: "technical", current: 4, target: 9, gap: 5 },
    { id: "2", name: "React & Next.js", category: "technical", current: 6, target: 9, gap: 3 },
    { id: "3", name: "System Design", category: "technical", current: 3, target: 8, gap: 5 },
    { id: "4", name: "Database Optimization", category: "technical", current: 5, target: 8, gap: 3 },
    { id: "5", name: "Interview Communication", category: "professional", current: 5, target: 9, gap: 4 },
  ]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <Cpu className="w-5 h-5 text-white" />
            <span>Skill Gap & Proficiency Matrix</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Skill Proficiency vs Target Roles</h1>
            <p className="text-xs text-zinc-400">Track and shrink current proficiency gaps relative to industry demand.</p>
          </div>
          <button className="btn-liquid btn-solid text-xs inline-flex items-center gap-1.5 self-start">
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((sk) => (
            <div key={sk.id} className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400">{sk.category}</span>
                  <h3 className="text-base font-semibold text-white">{sk.name}</h3>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono border border-white/15 bg-white/5 text-amber-400">
                  Gap: {sk.gap}/10
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>Current: Level {sk.current}</span>
                  <span>Target: Level {sk.target}</span>
                </div>
                <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-white h-full" style={{ width: `${(sk.current / 10) * 100}%` }} />
                  <div className="bg-amber-400/40 h-full" style={{ width: `${(sk.gap / 10) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
