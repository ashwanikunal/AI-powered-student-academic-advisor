"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Send, Sparkles, Award, ArrowLeft } from "lucide-react";

export default function MockInterviewPage() {
  const [question, setQuestion] = useState("Explain how indexing improves database query performance, and state when an index might degrade write speed.");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleEvaluate = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/mock-interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(data.data);
      }
    } catch (err: any) {
      alert("Error evaluating interview answer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <MessageSquare className="w-5 h-5 text-white" />
            <span>AI Mock Interview Simulator</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Interactive AI Technical Interview Practice</h1>
          <p className="text-xs text-zinc-400">Receive objective feedback on technical accuracy, communication clarity, and response structure.</p>
        </div>

        {/* Question Box */}
        <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>ROLE: SOFTWARE ENGINEER</span>
            <span>DIFFICULTY: MID-LEVEL</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{question}</h3>
        </div>

        {/* Answer Input */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-zinc-300">Your Response:</label>
          <textarea
            rows={5}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/40 text-white placeholder-zinc-600"
            placeholder="Type your structured answer here (e.g., using the STAR framework)..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            onClick={handleEvaluate}
            disabled={loading || !answer.trim()}
            className="btn-liquid btn-solid text-xs px-6 py-2.5 font-semibold disabled:opacity-30"
          >
            {loading ? "Evaluating Answer..." : "Submit for AI Evaluation"}
          </button>
        </div>

        {/* Feedback Display */}
        {feedback && (
          <div className="p-6 rounded-xl bg-zinc-950 border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Evaluation Rubric Result</h3>
              </div>
              <div className="text-2xl font-mono font-bold text-white">{feedback.overallScore}/100</div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className="p-3 bg-zinc-900 rounded-lg">
                <div className="text-xs text-zinc-400">Accuracy</div>
                <div className="text-lg font-bold text-white mt-1">{feedback.technicalAccuracyScore}/100</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg">
                <div className="text-xs text-zinc-400">Communication</div>
                <div className="text-lg font-bold text-white mt-1">{feedback.communicationScore}/100</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg">
                <div className="text-xs text-zinc-400">Structure</div>
                <div className="text-lg font-bold text-white mt-1">{feedback.structureScore}/100</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-emerald-400">Key Strengths:</span>
                <ul className="list-disc list-inside text-zinc-300 mt-1">
                  {feedback.strengths?.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-semibold text-amber-400">Areas to Improve:</span>
                <ul className="list-disc list-inside text-zinc-300 mt-1">
                  {feedback.areasToImprove?.map((a: string, i: number) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-zinc-900 border border-white/5 rounded-lg space-y-1">
                <span className="font-semibold text-white">Suggested Ideal Answer:</span>
                <p className="text-zinc-300 leading-relaxed">{feedback.suggestedAnswer}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
