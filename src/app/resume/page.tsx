"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Sparkles, CheckCircle, AlertTriangle } from "lucide-react";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState(
    "Built a web application for student tracking using React and Node.js. Implemented database schema in MongoDB."
  );
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole: "Software Engineer" }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.data);
      }
    } catch (err: any) {
      alert("Resume analysis error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <FileText className="w-5 h-5 text-white" />
            <span>Resume & Bullet Point Impact Analyzer</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resume Target Role Alignment Scanner</h1>
          <p className="text-xs text-zinc-400">Never invents achievements. Enhances existing bullet points with quantified metric framing.</p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-zinc-300">Paste Your Resume Bullet Points / Draft:</label>
          <textarea
            rows={6}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/40 text-white placeholder-zinc-600"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-liquid btn-solid text-xs px-6 py-2.5 font-semibold disabled:opacity-30"
          >
            {loading ? "Analyzing Bullet Points..." : "Analyze Resume Impact"}
          </button>
        </div>

        {analysis && (
          <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-white">Target Role Match Result</h3>
              <div className="text-2xl font-mono font-bold text-white">{analysis.overallMatchScore}% Match</div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-emerald-400">Strengths Detected:</span>
                <ul className="list-disc list-inside text-zinc-300 mt-1">
                  {analysis.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div>
                <span className="font-semibold text-amber-400">Missing Keywords:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {analysis.missingKeywords?.map((kw: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[11px]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/5">
                <span className="font-semibold text-white">Suggested Bullet Point Impact Rewrite:</span>
                {analysis.bulletPointFixes?.map((fix: any, idx: number) => (
                  <div key={idx} className="p-4 bg-zinc-900 border border-white/5 rounded-lg space-y-2">
                    <div className="text-zinc-500 line-through">Original: {fix.original}</div>
                    <div className="text-emerald-300 font-medium">Improved: {fix.improved}</div>
                    <div className="text-zinc-400 italic">Reason: {fix.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
