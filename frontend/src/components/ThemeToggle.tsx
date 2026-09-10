"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      if (initial === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme mode"
        className={`w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] opacity-0 ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`nav-pill !px-2.5 !py-0 flex items-center gap-1.5 transition-all duration-300 ${className}`}
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
          <span className="text-xs font-medium hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
          <span className="text-xs font-medium hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
