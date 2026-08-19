"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Calculator, AlertCircle, Plus, Check } from "lucide-react";

export default function AcademicsPage() {
  const [subjects, setSubjects] = useState([
    { id: "1", name: "Data Structures & Algorithms", code: "CS301", credits: 4, marks: 72, examDays: 10, priorityScore: 92 },
    { id: "2", name: "Database Management Systems", code: "CS302", credits: 3, marks: 65, examDays: 4, priorityScore: 88 },
    { id: "3", name: "Operating Systems", code: "CS303", credits: 3, marks: 80, examDays: 18, priorityScore: 75 },
    { id: "4", name: "Computer Networks", code: "CS304", credits: 3, marks: 74, examDays: 15, priorityScore: 78 },
  ]);

  const [cgpaTarget, setCgpaTarget] = useState(8.5);
  const [currentCgpa, setCurrentCgpa] = useState(7.8);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <BookOpen className="w-5 h-5 text-white" />
            <span>Academic Excellence Hub</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dynamic Subject Priority & Grades</h1>
            <p className="text-xs text-zinc-400">Subject importance updates dynamically based on upcoming exams and current grade weakness.</p>
          </div>
          <button className="btn-liquid btn-solid text-xs inline-flex items-center gap-1.5 self-start">
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        </div>

        {/* CGPA Calculator Banner */}
        <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
              <Calculator className="w-4 h-4 text-white" />
              <span>CGPA Calculator</span>
            </div>
            <div className="text-3xl font-mono font-bold mt-1">{currentCgpa} <span className="text-sm font-sans font-normal text-zinc-400">/ 10</span></div>
            <p className="text-xs text-zinc-400 mt-1">Current Cumulative Grade Point Average</p>
          </div>
          <div>
            <span className="text-xs text-zinc-400">Target CGPA</span>
            <div className="text-2xl font-mono font-semibold text-emerald-400">{cgpaTarget}</div>
            <p className="text-xs text-zinc-400 mt-1">Required term GPA: 8.8+ across 13 remaining credits</p>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900 border border-white/5 text-xs text-zinc-300 space-y-1">
            <span className="font-semibold text-white">Dynamic Rule:</span>
            <p>Subject priority score scales higher automatically when exam proximity drops below 14 days or current grade is &lt;75%.</p>
          </div>
        </div>

        {/* Subjects Priority Table */}
        <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
          <h2 className="text-base font-semibold">Current Semester Subjects</h2>
          <div className="divide-y divide-white/10">
            {subjects.map((sub) => (
              <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-white">{sub.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/15 bg-zinc-900 text-zinc-400">{sub.code}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                    <span>{sub.credits} Credits</span>
                    <span>•</span>
                    <span>Marks: {sub.marks}%</span>
                    <span>•</span>
                    <span className="text-amber-400">Exam in {sub.examDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-zinc-400">Calculated Priority</div>
                    <div className="text-sm font-mono font-bold text-white">{sub.priorityScore}/100</div>
                  </div>
                  <button className="btn-liquid btn-ghost text-xs px-3 py-1.5">Update Marks</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
