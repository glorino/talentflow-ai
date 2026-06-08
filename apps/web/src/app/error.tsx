"use client";

import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6">
      <div className="text-center max-w-md">
        <div className="mb-8 text-[120px] font-bold leading-none bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
          !
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-105"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3 text-sm font-semibold transition-all hover:bg-muted"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
