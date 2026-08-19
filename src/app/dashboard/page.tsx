"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
  TrendingUp,
  BookOpen,
  Cpu,
  Calendar,
  Sparkles,
  ChevronRight,
  RefreshCw,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [examMode, setExamMode] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile");
      const result = await res.json();
      if (result.success) {
        setData(result);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard state:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-zinc-400 font-mono">Synchronizing Deterministic Priority Engine...</p>
      </div>
    );
  }

  const profile = data?.profile || {};
  const primaryGoal = data?.goals?.[0] || { title: "Software Engineer Placement", progressPercentage: 20 };
  const subjects = data?.subjects || [];
  const skills = data?.skills || [];
  const tasks = data?.tasks || [];
  const readiness = data?.readiness || { overallScore: 78 };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <g transform="rotate(-30 12 12)">
                  <circle cx="7.3" cy="3.2" r="1.45" />
                  <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                  <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                  <circle cx="16.7" cy="20.8" r="1.45" />
                </g>
              </svg>
              <span>Vesper Advisor</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-xs text-zinc-400">
              <Link href="/dashboard" className="px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium">
                Dashboard
              </Link>
              <Link href="/goals" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Goals
              </Link>
              <Link href="/academics" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Academics
              </Link>
              <Link href="/skills" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Skills
              </Link>
              <Link href="/career" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Career
              </Link>
              <Link href="/planner" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Planner
              </Link>
              <Link href="/interview" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Interview Practice
              </Link>
              <Link href="/resume" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">
                Resume Analyzer
              </Link>
              <Link href="/advisor" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all flex items-center gap-1 text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                AI Chat
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 hidden sm:inline-block">
              {profile.degreeProgram || "B.Tech"} • Year {profile.currentYear || 3}
            </span>
            <Link
              href="/onboarding"
              className="px-3 py-1.5 text-xs font-medium border border-white/20 rounded-lg hover:border-white/40 transition-all"
            >
              Edit Setup
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        {/* Top Central Question Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <BrainCircuit className="w-4 h-4 text-white" />
              <span>Daily Central Question</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              &quot;What should I prioritize and do today?&quot;
            </h1>
            <p className="text-sm text-zinc-400">
              Personalized based on your <span className="text-white font-medium">{primaryGoal.title}</span> target, upcoming exams, and available time ({profile.availableHoursPerDay || 4} hrs/day).
            </p>
          </div>

          {/* Mode Switcher (Normal vs Exam Mode) */}
          <div className="flex items-center gap-3 z-10 shrink-0 bg-black/60 p-2 rounded-xl border border-white/10">
            <button
              onClick={() => setExamMode(false)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                !examMode ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Normal Mode
            </button>
            <button
              onClick={() => setExamMode(true)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                examMode ? "bg-amber-500 text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Exam Mode (Exams &lt; 14 Days)
            </button>
          </div>
        </div>

        {/* 4 Core Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Primary Goal */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>PRIMARY GOAL</span>
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold truncate text-white">{primaryGoal.title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Target: {new Date(primaryGoal.targetDate || Date.now() + 140*24*60*60*1000).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Progress</span>
                <span className="font-mono text-white">{primaryGoal.progressPercentage}%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full transition-all duration-500" style={{ width: `${primaryGoal.progressPercentage}%` }} />
              </div>
            </div>
          </div>

          {/* Card 2: Days Remaining */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>TIMELINE HORIZON</span>
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-3xl font-mono font-bold tracking-tight text-white">148 <span className="text-sm font-sans font-normal text-zinc-400">Days</span></div>
              <p className="text-xs text-zinc-400 mt-0.5">Until placement season window</p>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              Weekly Capacity: {(profile.availableHoursPerDay || 4) * 7} Hours
            </div>
          </div>

          {/* Card 3: Placement Readiness Index */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>READINESS INDEX</span>
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-3xl font-mono font-bold tracking-tight text-white">{readiness.overallScore}<span className="text-sm font-sans font-normal text-zinc-400">/100</span></div>
              <p className="text-xs text-zinc-400 mt-0.5">Weighted technical readiness score</p>
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4 points this week</span>
            </div>
          </div>

          {/* Card 4: Academic Exam Alert */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-amber-400 text-xs font-medium">
              <span>ACADEMIC EXAM ALERT</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold truncate text-white">DBMS Midterm Exam</h3>
              <p className="text-xs text-amber-300 mt-0.5">Exam in 4 days • Priority: High</p>
            </div>
            <div className="text-xs text-zinc-400">
              Current Grade: <span className="text-white font-mono font-semibold">68%</span> (Target: 90%)
            </div>
          </div>
        </div>

        {/* Main Grid: Today's Highest Impact Actions & Workload Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Today's Highest Impact Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Today&apos;s Highest-Impact Actions</h2>
                <p className="text-xs text-zinc-400">Recommended by the Deterministic Priority Engine.</p>
              </div>
              <button
                onClick={fetchProfileData}
                className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-calculate</span>
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task: any) => {
                  const isDone = completedTasks[task._id || task.title];
                  return (
                    <div
                      key={task._id || task.title}
                      className={`p-5 rounded-xl border transition-all space-y-3 ${
                        isDone
                          ? "bg-zinc-950/40 border-white/5 opacity-60"
                          : "bg-zinc-950 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTaskCompletion(task._id || task.title)}
                            className="mt-0.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            <CheckCircle2
                              className={`w-5 h-5 ${isDone ? "text-emerald-500 fill-emerald-500/20" : ""}`}
                            />
                          </button>
                          <div>
                            <h3 className={`text-base font-semibold ${isDone ? "line-through text-zinc-500" : "text-white"}`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1 font-mono">
                              <span>⏱ {task.estimatedMinutes || 45} mins</span>
                              <span>•</span>
                              <span className="text-white font-semibold">Priority: {task.priorityScore || 85}/100</span>
                              <span>•</span>
                              <span className="capitalize text-zinc-300">[{task.category}]</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-white/15 bg-white/5 text-zinc-300">
                          High Impact
                        </span>
                      </div>

                      {/* Explanation Badge */}
                      <div className="p-3 rounded-lg bg-zinc-900/80 border border-white/5 text-xs text-zinc-300 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white mr-1">WHY RECOMMENDED:</span>
                          {task.recommendationReason || "Matches target role requirements and upcoming milestone deadlines."}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-sm font-semibold">All daily high-impact actions generated</h3>
                  <p className="text-xs text-zinc-400">Complete tasks to mark progress towards primary goals.</p>
                </div>
              )}
            </div>

            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              <Link
                href="/interview"
                className="p-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <MessageSquare className="w-5 h-5 text-white" />
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-semibold text-white">AI Mock Interview</h4>
                <p className="text-xs text-zinc-400">Practice questions with STAR rubric analysis.</p>
              </Link>

              <Link
                href="/resume"
                className="p-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <FileText className="w-5 h-5 text-white" />
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-semibold text-white">Resume Analyzer</h4>
                <p className="text-xs text-zinc-400">Bullet point impact metrics scanner.</p>
              </Link>

              <Link
                href="/planner"
                className="p-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all space-y-2 group col-span-2 sm:col-span-1"
              >
                <div className="flex items-center justify-between">
                  <Calendar className="w-5 h-5 text-white" />
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-semibold text-white">Adaptive Planner</h4>
                <p className="text-xs text-zinc-400">Auto-rebalance workload schedule.</p>
              </Link>
            </div>
          </div>

          {/* Right Column: Workload Distribution & Skill Gaps */}
          <div className="space-y-6">
            {/* Workload Allocation */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Adaptive Workload Shift</h3>
                <span className="text-xs font-mono text-zinc-400">{examMode ? "Exam Mode" : "Normal Mode"}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Academic Core</span>
                    <span className="font-mono text-white">{examMode ? "65%" : "25%"}</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: examMode ? "65%" : "25%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Placement & DSA</span>
                    <span className="font-mono text-white">{examMode ? "15%" : "45%"}</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full transition-all duration-300" style={{ width: examMode ? "15%" : "45%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Skill Development</span>
                    <span className="font-mono text-white">{examMode ? "10%" : "15%"}</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full transition-all duration-300" style={{ width: examMode ? "10%" : "15%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Projects & System Design</span>
                    <span className="font-mono text-white">{examMode ? "10%" : "15%"}</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: examMode ? "10%" : "15%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Gap Matrix */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Skill Gap Matrix</h3>
                <Link href="/skills" className="text-xs text-zinc-400 hover:text-white">View All</Link>
              </div>

              <div className="space-y-3">
                {skills.slice(0, 4).map((sk: any) => (
                  <div key={sk._id || sk.name} className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{sk.name}</span>
                      <span className="font-mono text-zinc-400">{sk.currentLevel || 4}/10 → Target {sk.targetLevel || 8}/10</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden flex">
                      <div className="bg-white h-full" style={{ width: `${((sk.currentLevel || 4) / 10) * 100}%` }} />
                      <div className="bg-white/20 h-full" style={{ width: `${(((sk.targetLevel || 8) - (sk.currentLevel || 4)) / 10) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Advisor Assistant Quick Box */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-950/60 via-zinc-950 to-purple-950/60 border border-indigo-500/20 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4" />
                <span>Contextual AI Advisor</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                &quot;You have DBMS Midterm exam in 4 days. I recommend prioritizing DBMS Normalization today before resuming DSA trees.&quot;
              </p>
              <Link
                href="/advisor"
                className="btn-liquid btn-ghost w-full text-xs font-medium text-center block py-2 rounded-lg"
              >
                Ask AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
