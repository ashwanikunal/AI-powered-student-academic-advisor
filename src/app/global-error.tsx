"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Global System Error</h2>
        <p className="text-xs text-zinc-400 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
