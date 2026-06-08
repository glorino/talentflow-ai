"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Zap,
  Users,
  BarChart3,
  Bot,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { icon: Bot, title: "9 AI Agents", desc: "Automate hiring, payroll, compliance & more" },
  { icon: Users, title: "1,247 Employees", desc: "Manage your entire workforce" },
  { icon: Shield, title: "96.8% Compliance", desc: "Stay compliant with regulations" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Make data-driven HR decisions" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister
            ? { action: "register", email, password, firstName, lastName }
            : { action: "login", email, password }
        ),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("tf_token", data.data.token);
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand & Features */}
      <div className="relative hidden w-1/2 lg:flex lg:flex-col lg:justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%)",
            backgroundSize: "50px 50px"
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TalentFlow</h1>
              <p className="text-sm text-slate-400">AI-Powered HR Platform</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            The future of HR<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              is intelligent
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-md">
            Automate your entire HR workflow with 9 AI agents. From recruitment to retirement, we've got you covered.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 text-sm text-slate-500">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>Trusted by 500+ companies worldwide</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">TalentFlow</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {isRegister ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isRegister
                ? "Start your journey with TalentFlow AI"
                : "Sign in to access your HR dashboard"
              }
            </p>
          </div>

          {/* Quick Login Button */}
          <button
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch("/api/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "login", email: "admin@talentflow.ai", password: "admin123" }),
                });
                const data = await res.json();
                if (data.success) {
                  localStorage.setItem("tf_token", data.data.token);
                  router.push("/dashboard");
                }
              } catch {}
              setLoading(false);
            }}
            className="w-full mb-6 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 py-3 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
          >
            <Zap size={16} />
            Quick Demo Login
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border bg-background px-4 text-sm transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border bg-background px-4 text-sm transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border bg-background px-4 text-sm transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border bg-background px-4 pr-11 text-sm transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative h-11 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {isRegister ? "Create Account" : "Sign In"}
                  <ArrowRight size={16} />
                </div>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="font-semibold text-primary hover:underline"
            >
              {isRegister ? "Sign in" : "Get started free"}
            </button>
          </p>

          <div className="mt-8 rounded-xl bg-muted/50 p-4">
            <p className="text-xs text-center text-muted-foreground mb-2">Demo Credentials</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <code className="rounded bg-background px-2 py-1 font-mono">admin@talentflow.ai</code>
              <code className="rounded bg-background px-2 py-1 font-mono">admin123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
