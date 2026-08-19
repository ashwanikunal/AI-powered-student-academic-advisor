"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Target, Plus, CheckCircle2, Calendar, ArrowRight } from "lucide-react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    {
      id: "1",
      type: "Placement / Job",
      title: "Software Engineer Placement",
      priority: "primary",
      targetDate: "2027-01-15",
      progress: 20,
      milestones: [
        { title: "Master 150 DSA Patterns", completed: true },
        { title: "Build Fullstack Next.js Capstone", completed: false },
        { title: "Mock Interview Score 85+", completed: false },
      ],
    },
    {
      id: "2",
      type: "Academic Excellence",
      title: "Maintain Semester GPA 8.5+",
      priority: "secondary",
      targetDate: "2026-12-01",
      progress: 45,
      milestones: [
        { title: "DBMS Midterm Top 10%", completed: false },
        { title: "Submit Operating Systems Lab Assignment", completed: true },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <Target className="w-5 h-5 text-white" />
            <span>Multi-Goal Engine</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your Goal Portfolio</h1>
            <p className="text-xs text-zinc-400">&quot;You choose the goal. AI plans the journey.&quot;</p>
          </div>
          <button className="btn-liquid btn-solid text-xs inline-flex items-center gap-1.5 self-start">
            <Plus className="w-4 h-4" /> Add Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono border border-white/15 bg-white/5 text-zinc-300 uppercase">
                    {goal.priority} • {goal.type}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 text-white">{goal.title}</h3>
                </div>
                <div className="text-right font-mono text-xs text-zinc-400">
                  Target: {goal.targetDate}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>Overall Milestone Progress</span>
                  <span className="text-white font-bold">{goal.progress}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full transition-all duration-300" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-xs font-semibold text-zinc-300">Milestones:</span>
                {goal.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2 className={`w-4 h-4 ${m.completed ? "text-emerald-400" : "text-zinc-600"}`} />
                    <span className={m.completed ? "line-through text-zinc-500" : "text-white"}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
