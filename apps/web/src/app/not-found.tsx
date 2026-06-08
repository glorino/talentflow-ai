"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <div className="text-[120px] font-bold leading-none bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-primary/30">
              <Search size={28} className="text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-105"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3 text-sm font-semibold transition-all hover:bg-muted"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/features" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Sparkles size={14} className="text-primary" /> Features
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
