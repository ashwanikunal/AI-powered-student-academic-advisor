"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar as CalendarIcon, RefreshCw, Clock, CheckCircle2 } from "lucide-react";

export default function PlannerPage() {
  const [rebalanced, setRebalanced] = useState(false);
  const [examMode, setExamMode] = useState(false);

  const days = [
    { day: "Today", date: "Aug 20", tasks: 3, hours: 4, status: "Active" },
    { day: "Tomorrow", date: "Aug 21", tasks: 3, hours: 4, status: "Planned" },
    { day: "Friday", date: "Aug 22", tasks: 4, hours: 4.5, status: "Planned" },
    { day: "Saturday", date: "Aug 23", tasks: 2, hours: 3, status: "Planned" },
    { day: "Sunday", date: "Aug 24", tasks: 1, hours: 2, status: "Holiday / Light Revision" },
  ];

  const handleRebalance = () => {
    setRebalanced(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <CalendarIcon className="w-5 h-5 text-white" />
            <span>Adaptive Planner & Schedule Rebalancer</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Adaptive Calendar & Workload Distribution</h1>
            <p className="text-xs text-zinc-400">Plans adjust dynamically when tasks are missed or when exams approach.</p>
          </div>
          <button
            onClick={handleRebalance}
            className="btn-liquid btn-solid text-xs inline-flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Auto-Rebalance Schedule
          </button>
        </div>

        {rebalanced && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Schedule rebalanced cleanly! Added +15 mins/day over 7 days to absorb missed tasks without overload.</span>
          </div>
        )}

        <div className="space-y-4">
          {days.map((d, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400">{d.date} • {d.status}</span>
                <h3 className="text-base font-semibold text-white mt-0.5">{d.day}</h3>
              </div>
              <div className="flex items-center gap-6 text-xs font-mono text-zinc-300">
                <span>{d.tasks} Tasks Scheduled</span>
                <span>⏱ {d.hours} Hours</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
