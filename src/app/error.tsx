"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-xs text-zinc-400 max-w-md">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
