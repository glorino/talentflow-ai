"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Bot,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">
              Talent<span className="text-primary">Flow</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>

          <button
            className="md:hidden rounded-lg p-2 hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t md:hidden animate-slide-up">
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4 space-y-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                  Sign In
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold">
                  Talent<span className="text-primary">Flow</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                The AI-powered HR operating system that automates recruitment, payroll, compliance, and more.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Bot size={14} className="text-primary" />
                  9 AI Agents
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield size={14} className="text-emerald-500" />
                  SOC2
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap size={14} className="text-amber-500" />
                  99.9% Uptime
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-2.5">
                {["Features", "Pricing", "Integrations", "API Docs", "Changelog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2.5">
                {["About", "Blog", "Careers", "Press Kit", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2026 TalentFlow AI. All rights reserved.</p>
            <p>Made with AI for the future of HR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
