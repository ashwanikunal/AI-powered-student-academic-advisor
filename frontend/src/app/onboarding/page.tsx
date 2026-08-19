"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Sparkles, GraduationCap, Target, BookOpen, Cpu, Calendar, Clock } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Onboarding Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "India",
    location: "",
    degreeProgram: "B.Tech",
    specialization: "Computer Science & Engineering",
    institution: "Tech University",
    programDurationYears: 4,
    academicStructureType: "semesters",
    totalTerms: 8,
    currentYear: 3,
    currentTerm: 5,
    expectedCompletionDate: "2027-05-30",
    goals: [
      { type: "Placement / Job", title: "Software Engineer Placement", priority: "primary", targetDate: "2027-01-15" },
      { type: "Academic Excellence", title: "Maintain CGPA 8.5+", priority: "secondary", targetDate: "2026-12-01" },
    ],
    subjects: [
      { name: "Data Structures & Algorithms", credits: 4, marks: 72, examDays: 10 },
      { name: "Database Management Systems", credits: 3, marks: 65, examDays: 4 },
      { name: "Operating Systems", credits: 3, marks: 80, examDays: 18 },
      { name: "Computer Networks", credits: 3, marks: 74, examDays: 15 },
    ],
    skills: [
      { name: "Data Structures & Algorithms", level: 4, target: 9, category: "technical" },
      { name: "React & Next.js", level: 6, target: 9, category: "technical" },
      { name: "System Design", level: 3, target: 8, category: "technical" },
      { name: "Interview Communication", level: 5, target: 9, category: "professional" },
    ],
    targetRole: "Software Engineer",
    targetCompany: "Top Tech Enterprise",
    placementSeasonDate: "2026-10-01",
    availableHoursPerDay: 4,
    preferredStudyTime: "evening",
    interests: ["Web Development", "AI/ML", "System Design"],
  });

  const handleNext = () => {
    if (step < 9) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        alert("Onboarding failed: " + data.error);
      }
    } catch (err: any) {
      alert("Error submitting onboarding: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-900/20 via-indigo-900/30 to-purple-900/20 blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold text-lg">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <g transform="rotate(-30 12 12)">
              <circle cx="7.3" cy="3.2" r="1.45" />
              <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
              <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
              <circle cx="16.7" cy="20.8" r="1.45" />
            </g>
          </svg>
          <span>Vesper AI Advisor</span>
        </Link>
        <div className="text-xs text-muted-foreground font-mono">
          STEP {step} OF 9
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto w-full my-4 z-10">
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 h-full transition-all duration-300"
            style={{ width: `${(step / 9) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-2xl mx-auto w-full my-auto z-10 bg-zinc-950/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Basic Profile</h2>
                <p className="text-sm text-zinc-400">Tell us a bit about yourself.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40"
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40"
                  placeholder="alex@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Country</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40"
                    placeholder="City / Region"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Academic Program</h2>
                <p className="text-sm text-zinc-400">Supports any degree & custom program structure.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Degree / Program</label>
                <select
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 text-white"
                  value={formData.degreeProgram}
                  onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                >
                  <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                  <option value="M.Tech">M.Tech (Master of Technology)</option>
                  <option value="BCA">BCA (Computer Applications)</option>
                  <option value="MCA">MCA (Master of Computer Applications)</option>
                  <option value="BBA">BBA (Business Administration)</option>
                  <option value="MBA">MBA (Master of Business Administration)</option>
                  <option value="B.Sc">B.Sc (Bachelor of Science)</option>
                  <option value="MBBS">MBBS (Medicine)</option>
                  <option value="B.Pharm">B.Pharm (Pharmacy)</option>
                  <option value="LLB">LLB (Law)</option>
                  <option value="PhD">PhD / Doctorate</option>
                  <option value="Other / Custom Program">Other / Custom Program</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Specialization</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Structure Type</label>
                  <select
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 text-white"
                    value={formData.academicStructureType}
                    onChange={(e) => setFormData({ ...formData, academicStructureType: e.target.value })}
                  >
                    <option value="semesters">Semesters</option>
                    <option value="years">Years</option>
                    <option value="trimesters">Trimesters</option>
                    <option value="clinical_phases">Clinical Phases</option>
                    <option value="custom">Custom Terms</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Duration (Years)</label>
                  <input
                    type="number"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    value={formData.programDurationYears}
                    onChange={(e) => setFormData({ ...formData, programDurationYears: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Current Year</label>
                  <input
                    type="number"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    value={formData.currentYear}
                    onChange={(e) => setFormData({ ...formData, currentYear: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Current Term</label>
                  <input
                    type="number"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    value={formData.currentTerm}
                    onChange={(e) => setFormData({ ...formData, currentTerm: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Select Your Goals</h2>
                <p className="text-sm text-zinc-400">You choose the goals. AI plans the journey.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Placement / Job",
                "Academic Excellence",
                "Internship",
                "Higher Studies",
                "Research",
                "Competitive / Entrance Exam",
                "Study Abroad",
                "Personal Skill Development",
              ].map((g) => {
                const isSelected = formData.goals.some((goal) => goal.type === g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setFormData({
                          ...formData,
                          goals: formData.goals.filter((goal) => goal.type !== g),
                        });
                      } else {
                        setFormData({
                          ...formData,
                          goals: [
                            ...formData.goals,
                            { type: g, title: `${g} Target`, priority: formData.goals.length === 0 ? "primary" : "secondary", targetDate: "2027-01-15" },
                          ],
                        });
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      isSelected
                        ? "border-white bg-white/15 text-white"
                        : "border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{g}</span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Academic Subjects</h2>
                <p className="text-sm text-zinc-400">Current course subjects & upcoming exams.</p>
              </div>
            </div>
            <div className="space-y-3">
              {formData.subjects.map((sub, idx) => (
                <div key={idx} className="p-3.5 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="bg-transparent font-medium text-sm focus:outline-none w-full"
                      value={sub.name}
                      onChange={(e) => {
                        const newSubs = [...formData.subjects];
                        newSubs[idx].name = e.target.value;
                        setFormData({ ...formData, subjects: newSubs });
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div>
                      <span className="text-zinc-500 mr-1">Marks:</span>
                      <input
                        type="number"
                        className="w-12 bg-zinc-800 rounded px-1.5 py-0.5 text-center"
                        value={sub.marks}
                        onChange={(e) => {
                          const newSubs = [...formData.subjects];
                          newSubs[idx].marks = Number(e.target.value);
                          setFormData({ ...formData, subjects: newSubs });
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-zinc-500 mr-1">Exam in:</span>
                      <input
                        type="number"
                        className="w-12 bg-zinc-800 rounded px-1.5 py-0.5 text-center"
                        value={sub.examDays}
                        onChange={(e) => {
                          const newSubs = [...formData.subjects];
                          newSubs[idx].examDays = Number(e.target.value);
                          setFormData({ ...formData, subjects: newSubs });
                        }}
                      />
                      <span className="text-zinc-500 ml-1">days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Skills & Target Levels</h2>
                <p className="text-sm text-zinc-400">Current proficiency vs target expectation (0-10).</p>
              </div>
            </div>
            <div className="space-y-3">
              {formData.skills.map((sk, idx) => (
                <div key={idx} className="p-3.5 bg-zinc-900 border border-white/10 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>{sk.name}</span>
                    <span className="text-xs text-zinc-400">Current: {sk.level} / Target: {sk.target}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={sk.level}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[idx].level = Number(e.target.value);
                        setFormData({ ...formData, skills: newSkills });
                      }}
                      className="w-full accent-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Career & Placement Targets</h2>
                <p className="text-sm text-zinc-400">Customize role and target timeline.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Target Role</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Target Company Category</label>
                <input
                  type="text"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                  value={formData.targetCompany}
                  onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Placement Season Date</label>
                <input
                  type="date"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none text-white"
                  value={formData.placementSeasonDate}
                  onChange={(e) => setFormData({ ...formData, placementSeasonDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Availability & Capacity</h2>
                <p className="text-sm text-zinc-400">Avoid schedule overload with realistic time caps.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Available Study Hours / Day: {formData.availableHoursPerDay} hrs</label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={formData.availableHoursPerDay}
                  onChange={(e) => setFormData({ ...formData, availableHoursPerDay: Number(e.target.value) })}
                  className="w-full accent-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Preferred Time of Day</label>
                <select
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none text-white"
                  value={formData.preferredStudyTime}
                  onChange={(e) => setFormData({ ...formData, preferredStudyTime: e.target.value as any })}
                >
                  <option value="morning">Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 10 PM)</option>
                  <option value="night">Night (10 PM - 2 AM)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Interests & Specialization</h2>
                <p className="text-sm text-zinc-400">Personalize AI recommendation domain signals.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Web Development", "Generative AI", "System Design", "Cloud Infrastructure", "DevOps", "Cybersecurity", "Data Engineering", "Research"].map((interest) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setFormData({ ...formData, interests: formData.interests.filter((i) => i !== interest) });
                      } else {
                        setFormData({ ...formData, interests: [...formData.interests, interest] });
                      }
                    }}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? "border-white bg-white text-black font-semibold"
                        : "border-white/10 bg-zinc-900 text-zinc-400 hover:border-white/30"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 9 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Timeline & Confirmation</h2>
                <p className="text-sm text-zinc-400">Review your customized setup before entering dashboard.</p>
              </div>
            </div>
            <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-xl space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Degree Program:</span>
                <span className="font-semibold text-white">{formData.degreeProgram} ({formData.specialization})</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Primary Goal:</span>
                <span className="font-semibold text-white">{formData.goals[0]?.type || "Placement"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Target Role:</span>
                <span className="font-semibold text-white">{formData.targetRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Daily Capacity:</span>
                <span className="font-semibold text-white">{formData.availableHoursPerDay} Hours / Day</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="btn-liquid btn-ghost text-xs disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="btn-liquid btn-solid text-xs font-semibold"
          >
            {loading ? (
              "Initializing Engine..."
            ) : step === 9 ? (
              "Generate AI Roadmap"
            ) : (
              <>
                Next Step
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </button>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="text-center text-xs text-zinc-500 z-10">
        AI recommendations adapt dynamically based on your ongoing task progress and upcoming exams.
      </footer>
    </div>
  );
}
