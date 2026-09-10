"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Sarathi.ai?",
    answer: "Sarathi.ai is an intelligent academic and career advisory platform built for students. It optimizes your study schedule around exam dates, analyzes your resume against target ATS keywords, provides interactive AI mock interviews, and tracks placement readiness in real time.",
  },
  {
    question: "Is Sarathi.ai free for students?",
    answer: "Yes! Sarathi.ai offers a zero-cost student plan that includes personalized onboarding, daily adaptive study planning, basic resume scoring, and interactive AI advisory assistance.",
  },
  {
    question: "How does the AI Academic Advisor build my study schedule?",
    answer: "The adaptive planner engine analyzes your exam dates, course difficulty ratings, and self-reported daily energy levels. It automatically allocates optimal revision blocks so you never have to cram last-minute.",
  },
  {
    question: "Is my personal resume and academic data safe?",
    answer: "Absolutely. We adhere to strict privacy standards. Your academic history, exam grades, and resume contents are stored securely and used exclusively to generate your personalized advisory insights.",
  },
  {
    question: "Do I need to install any software or browser extensions?",
    answer: "No installation is required. Sarathi.ai operates 100% in your web browser across desktop, laptop, tablet, and mobile devices.",
  },
  {
    question: "How does the ATS Resume Analyzer evaluate my resume?",
    answer: "It parses your resume text against specific target tech roles (such as Full-Stack Developer or Data Analyst) to detect missing technical keywords, weak action verbs, and unquantified bullet points.",
  },
  {
    question: "Can I practice mock interviews for specific job profiles?",
    answer: "Yes! You can choose your target role and difficulty level. The AI interviewer asks relevant technical and behavioral questions and provides real-time scoring using the STAR framework.",
  },
];

export default function FAQSection() {
  // Array of open item indices to support multiple open accordion panels
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faqs" className="relative z-20 py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[var(--border-soft)]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="badge-liquid inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Got Questions?</span>
        </div>
        <h2 className="section-heading">
          Frequently Asked{" "}
          <span className="font-serif-italic font-normal text-[var(--muted)]">Questions.</span>
        </h2>
        <p className="section-subheading">
          Everything you need to know about Sarathi.ai platform features, security, and student tools.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          const panelId = `faq-answer-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div
              key={index}
              className="glass-card overflow-hidden transition-colors"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-xl transition-colors"
                >
                  <span className="text-base sm:text-lg font-medium text-[var(--text)] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-[var(--badge-bg)] text-[var(--text)] border border-[var(--border-soft)] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-indigo-500/20 border-indigo-500/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 px-6 pb-6" : "grid-rows-[0fr] opacity-0 px-6 pb-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-[var(--muted)] leading-relaxed pt-2 border-t border-[var(--border-soft)]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
