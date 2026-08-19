"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrainCircuit, Send, Sparkles, User, Bot } from "lucide-react";

export default function AdvisorChatPage() {
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      text: "Hello! I am your AI Career & Academic Advisor. I have full context on your primary goal, current subjects, upcoming DBMS exam in 4 days, and skill targets. What would you like to plan or discuss today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuestion = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/advisor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      });
      const data = await res.json();
      if (data.success && data.advice) {
        const aiMsg = {
          role: "assistant",
          text: data.advice.focusMessage || data.advice.greeting,
          topRec: data.advice.topRecommendation,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", text: "AI recommendation is temporarily working in offline mode. Prioritize your DBMS exam prep today!" }]);
      }
    } catch (err: any) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Offline fallback: Prioritize DBMS Normalization today due to exam proximity." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-sm">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            <span>Contextual AI Advisor</span>
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white">Back to Dashboard</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-6 py-6 flex-1 flex flex-col justify-between space-y-6">
        {/* Messages History */}
        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 text-xs sm:text-sm ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  m.role === "user" ? "bg-white text-black" : "bg-indigo-950/60 text-indigo-300 border border-indigo-500/20"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-400" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[80%] space-y-2 ${
                  m.role === "user"
                    ? "bg-zinc-900 border border-white/10 text-white"
                    : "bg-zinc-950 border border-white/10 text-zinc-200"
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                {m.topRec && (
                  <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 space-y-1 text-xs mt-2">
                    <span className="font-semibold text-white">Recommended Today:</span>
                    <div>{m.topRec.action} ({m.topRec.durationMinutes} mins)</div>
                    <div className="text-zinc-400 italic">{m.topRec.reason}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Analyzing student profile context slice...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 text-white placeholder-zinc-600"
            placeholder="Ask your advisor (e.g. What should I study today? Should I learn Docker now?)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="btn-liquid btn-solid p-3 rounded-xl disabled:opacity-30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
