"use client";

import Link from "next/link";
import MarketingLayout from "@/components/marketing-layout";
import {
  ArrowRight,
  Bot,
  Users,
  Shield,
  Zap,
  BarChart3,
  Brain,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  Sparkles,
  Play,
  ChevronRight,
  Building2,
  Globe,
  Award,
  Target,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Companies", icon: Building2, gradient: "from-blue-500 to-cyan-400" },
  { value: "1.2M", label: "Employees Managed", icon: Users, gradient: "from-purple-500 to-pink-400" },
  { value: "99.9%", label: "Uptime", icon: Zap, gradient: "from-emerald-500 to-teal-400" },
  { value: "4.9/5", label: "Customer Rating", icon: Star, gradient: "from-amber-500 to-orange-400" },
];

const agents = [
  { name: "Recruitment", gradient: "from-blue-500 to-indigo-600", tasks: 1247, accuracy: 98, bars: [65, 80, 45, 90, 70, 85] },
  { name: "Screening", gradient: "from-purple-500 to-violet-600", tasks: 3842, accuracy: 96, bars: [75, 55, 85, 60, 90, 70] },
  { name: "Interview", gradient: "from-emerald-500 to-teal-600", tasks: 892, accuracy: 94, bars: [50, 70, 65, 80, 55, 75] },
  { name: "Onboarding", gradient: "from-orange-500 to-red-500", tasks: 1156, accuracy: 97, bars: [80, 60, 70, 85, 65, 90] },
  { name: "Payroll", gradient: "from-pink-500 to-rose-600", tasks: 5621, accuracy: 99, bars: [90, 85, 80, 95, 88, 92] },
  { name: "Compliance", gradient: "from-cyan-500 to-blue-600", tasks: 2340, accuracy: 100, bars: [70, 85, 90, 75, 80, 95] },
  { name: "Performance", gradient: "from-amber-500 to-orange-600", tasks: 1893, accuracy: 95, bars: [60, 75, 85, 70, 80, 65] },
  { name: "Learning", gradient: "from-lime-500 to-green-600", tasks: 2156, accuracy: 93, bars: [85, 70, 60, 90, 75, 80] },
  { name: "Exit", gradient: "from-slate-500 to-gray-600", tasks: 423, accuracy: 98, bars: [55, 80, 70, 65, 85, 60] },
];

const features = [
  {
    icon: Bot,
    title: "9 AI Agents",
    description: "Automate recruitment, screening, payroll, compliance, and more with intelligent agents that learn from your data.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Brain,
    title: "Predictive Insights",
    description: "AI analyzes employee data to predict turnover risk, performance trends, and hiring needs before they become critical.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Compliance Engine",
    description: "Stay compliant with automated monitoring, training tracking, and audit-ready reports across all regulations.",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Powerful dashboards with department metrics, workforce analytics, and customizable reports for data-driven decisions.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    icon: Clock,
    title: "Smart Attendance",
    description: "GPS-enabled clock-in/out, remote work tracking, and automated timesheet generation with overtime alerts.",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: TrendingUp,
    title: "Performance Reviews",
    description: "360-degree feedback, goal tracking, and AI-generated performance summaries with actionable recommendations.",
    color: "from-red-500 to-rose-500",
    bg: "bg-red-50",
  },
];

const workflowSteps = [
  { step: "1", title: "Post Job", desc: "AI optimizes job description", icon: Target },
  { step: "2", title: "Screen Candidates", desc: "AI ranks and shortlists", icon: Users },
  { step: "3", title: "Schedule Interviews", desc: "Smart scheduling assistant", icon: Clock },
  { step: "4", title: "Make Offer", desc: "Competitive salary analysis", icon: Award },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of People, TechCorp",
    quote: "TalentFlow AI reduced our time-to-hire by 40% and improved employee retention by 25%. The AI agents are incredibly accurate.",
    avatar: "SC",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "HR Director, GlobalTech",
    quote: "The compliance engine alone saved us 200+ hours per quarter. We never miss a training deadline or certification renewal.",
    avatar: "JW",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "CFO, InnovateInc",
    quote: "Payroll processing went from 3 days to 30 minutes. The AI caught $50K in errors in the first month alone.",
    avatar: "MR",
    rating: 5,
  },
];

const logos = ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix"];

function CircularProgress({ percentage, size = 40, strokeWidth = 3 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MiniBarChart({ bars }: { bars: number[] }) {
  const maxBar = Math.max(...bars);
  return (
    <div className="flex items-end gap-1 h-8">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t bg-white/30 transition-all"
          style={{ height: `${(bar / maxBar) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium shadow-sm mb-8">
              <Sparkles size={14} className="text-primary" />
              <span>Powered by 9 AI Agents</span>
              <ArrowRight size={14} className="text-muted-foreground" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              The Future of HR
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                is Intelligent
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Automate your entire HR workflow with AI-powered agents. From recruitment to retirement,
              TalentFlow handles it all so you can focus on what matters most — your people.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-105"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-2 rounded-xl border bg-white px-8 py-4 text-base font-semibold transition-all hover:bg-muted">
                <Play size={18} className="text-primary" />
                Watch Demo
              </button>
            </div>

            <div className="mt-16">
              <p className="text-sm text-muted-foreground mb-4">Trusted by 500+ companies worldwide</p>
              <div className="flex items-center justify-center gap-8 opacity-40">
                {logos.map((logo) => (
                  <span key={logo} className="text-lg font-bold text-gray-400">{logo}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 mx-auto max-w-5xl">
            <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden">
              <div className="border-b px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="rounded-lg bg-muted px-4 py-1 text-xs text-muted-foreground">
                    app.talentflow.ai/dashboard
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Employees", value: "1,247", color: "bg-blue-500" },
                    { label: "Open Roles", value: "34", color: "bg-purple-500" },
                    { label: "Attendance", value: "94%", color: "bg-emerald-500" },
                    { label: "AI Score", value: "96%", color: "bg-amber-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/10 p-4">
                      <div className={`h-1 w-8 rounded ${stat.color} mb-2`} />
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-xl bg-white/10 p-4">
                    <p className="text-sm font-medium text-white mb-3">Department Performance</p>
                    <div className="space-y-2">
                      {["Engineering", "Sales", "Marketing"].map((dept, i) => (
                        <div key={dept} className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-20">{dept}</span>
                          <div className="flex-1 h-2 rounded-full bg-white/10">
                            <div className={`h-full rounded-full ${i === 0 ? "bg-blue-500" : i === 1 ? "bg-purple-500" : "bg-emerald-500"}`} style={{ width: `${[88, 82, 91][i]}%` }} />
                          </div>
                          <span className="text-xs text-white font-medium">{[88, 82, 91][i]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4">
                    <p className="text-sm font-medium text-white mb-3">AI Insights</p>
                    <div className="space-y-2">
                      {["Retention risk: 3", "Hiring velocity: -8d", "Compliance: 96%"].map((insight) => (
                        <div key={insight} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-xs text-slate-300">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with Gradients */}
      <section className="py-16 border-b">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 -translate-x-4" />
                  <div className="relative">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon size={20} className="text-white" />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-white/80 mt-1">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to
              <br />
              <span className="text-primary">manage your workforce</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered recruitment to automated payroll, TalentFlow covers every aspect of HR
              with intelligent automation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Agent Performance Infographic */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-4 py-2 text-sm font-medium text-blue-400 mb-6">
              <Bot size={16} />
              <span>AI-Powered Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              9 AI Agents Working 24/7
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Each agent specializes in a critical HR function, continuously learning and improving accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all hover:scale-105 hover:border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      <p className="text-sm text-slate-400">{agent.tasks.toLocaleString()} tasks completed</p>
                    </div>
                    <div className="relative">
                      <CircularProgress percentage={agent.accuracy} size={48} strokeWidth={4} />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-400">
                        {agent.accuracy}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Weekly Activity</p>
                    <MiniBarChart bars={agent.bars} />
                  </div>

                  <div className={`h-1 w-full rounded-full bg-gradient-to-r ${agent.gradient} opacity-50`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 px-8 py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">19,670</p>
                <p className="text-xs text-slate-400">Tasks Processed Today</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">97.2%</p>
                <p className="text-xs text-slate-400">Average Accuracy</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">0.3s</p>
                <p className="text-xs text-slate-400">Avg Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HR Metrics Dashboard Preview */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real-time HR Intelligence
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful dashboards that give you complete visibility into your workforce metrics.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-slate-400">HR Dashboard Overview</span>
              </div>
              <span className="text-xs text-slate-500">Live • Updated 2s ago</span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Employees", value: "1,247", change: "+12%", gradient: "from-blue-500 to-blue-600" },
                { label: "Active Positions", value: "34", change: "+5", gradient: "from-purple-500 to-purple-600" },
                { label: "Retention Rate", value: "94.2%", change: "+2.1%", gradient: "from-emerald-500 to-emerald-600" },
                { label: "Satisfaction", value: "4.8/5", change: "+0.3", gradient: "from-amber-500 to-orange-500" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
                  </div>
                  <div className={`mt-2 h-1 w-full rounded-full bg-gradient-to-r ${stat.gradient}`} />
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Bar Chart */}
              <div className="col-span-1 rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-medium text-white mb-4">Department Headcount</p>
                <svg viewBox="0 0 200 120" className="w-full">
                  <defs>
                    <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                    <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#6D28D9" />
                    </linearGradient>
                    <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="barGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                  <rect x="20" y="60" width="25" height="55" rx="4" fill="url(#barGrad1)" />
                  <rect x="55" y="30" width="25" height="85" rx="4" fill="url(#barGrad2)" />
                  <rect x="90" y="45" width="25" height="70" rx="4" fill="url(#barGrad3)" />
                  <rect x="125" y="20" width="25" height="95" rx="4" fill="url(#barGrad4)" />
                  <rect x="160" y="50" width="25" height="65" rx="4" fill="url(#barGrad1)" />
                  <text x="32" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">Eng</text>
                  <text x="67" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">Sales</text>
                  <text x="102" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">Mktg</text>
                  <text x="137" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">Ops</text>
                  <text x="172" y="115" fill="#94A3B8" fontSize="8" textAnchor="middle">HR</text>
                </svg>
              </div>

              {/* Line Chart */}
              <div className="col-span-1 rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-medium text-white mb-4">Hiring Trend (6mo)</p>
                <svg viewBox="0 0 200 120" className="w-full">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 90 Q 50 70, 60 75 T 100 50 T 140 35 T 180 20"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 20 90 Q 50 70, 60 75 T 100 50 T 140 35 T 180 20 L 180 100 L 20 100 Z"
                    fill="url(#lineGrad)"
                    opacity="0.2"
                  />
                  <circle cx="20" cy="90" r="4" fill="#3B82F6" />
                  <circle cx="60" cy="75" r="4" fill="#3B82F6" />
                  <circle cx="100" cy="50" r="4" fill="#3B82F6" />
                  <circle cx="140" cy="35" r="4" fill="#3B82F6" />
                  <circle cx="180" cy="20" r="4" fill="#3B82F6" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" strokeWidth="1" />
                  <text x="20" y="115" fill="#94A3B8" fontSize="8">Jan</text>
                  <text x="60" y="115" fill="#94A3B8" fontSize="8">Feb</text>
                  <text x="100" y="115" fill="#94A3B8" fontSize="8">Mar</text>
                  <text x="140" y="115" fill="#94A3B8" fontSize="8">Apr</text>
                  <text x="180" y="115" fill="#94A3B8" fontSize="8">May</text>
                </svg>
              </div>

              {/* Pie Chart */}
              <div className="col-span-1 rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-medium text-white mb-4">Workforce Distribution</p>
                <svg viewBox="0 0 200 120" className="w-full">
                  <defs>
                    <linearGradient id="pieGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="pieGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    <linearGradient id="pieGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="pieGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                  </defs>
                  <circle cx="80" cy="60" r="45" fill="none" stroke="url(#pieGrad1)" strokeWidth="18" strokeDasharray="90 283" strokeDashoffset="0" />
                  <circle cx="80" cy="60" r="45" fill="none" stroke="url(#pieGrad2)" strokeWidth="18" strokeDasharray="70 283" strokeDashoffset="-90" />
                  <circle cx="80" cy="60" r="45" fill="none" stroke="url(#pieGrad3)" strokeWidth="18" strokeDasharray="60 283" strokeDashoffset="-160" />
                  <circle cx="80" cy="60" r="45" fill="none" stroke="url(#pieGrad4)" strokeWidth="18" strokeDasharray="63 283" strokeDashoffset="-220" />
                  <circle cx="80" cy="60" r="30" fill="#1E293B" />
                  <text x="80" y="58" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">1,247</text>
                  <text x="80" y="68" fill="#94A3B8" fontSize="8" textAnchor="middle">employees</text>
                  <rect x="135" y="35" width="8" height="8" rx="2" fill="url(#pieGrad1)" />
                  <text x="148" y="42" fill="#CBD5E1" fontSize="8">Engineering 40%</text>
                  <rect x="135" y="50" width="8" height="8" rx="2" fill="url(#pieGrad2)" />
                  <text x="148" y="57" fill="#CBD5E1" fontSize="8">Sales 25%</text>
                  <rect x="135" y="65" width="8" height="8" rx="2" fill="url(#pieGrad3)" />
                  <text x="148" y="72" fill="#CBD5E1" fontSize="8">Marketing 20%</text>
                  <rect x="135" y="80" width="8" height="8" rx="2" fill="url(#pieGrad4)" />
                  <text x="148" y="87" fill="#CBD5E1" fontSize="8">Other 15%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Seamless Integrations
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Connect TalentFlow with your existing tools and workflows for maximum productivity.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl aspect-square">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 z-10">
              <div className="text-center text-white">
                <Sparkles size={28} className="mx-auto mb-2" />
                <p className="text-sm font-bold">TalentFlow</p>
                <p className="text-xs opacity-80">AI Platform</p>
              </div>
            </div>

            {/* Connection Lines SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="150" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" strokeDasharray="8 4" className="animate-[spin_30s_linear_infinite]" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="url(#lineGrad1)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite_reverse]" />
              {/* Connecting lines */}
              <line x1="200" y1="200" x2="200" y2="60" stroke="#3B82F6" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="310" y2="110" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="1.2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="340" y2="200" stroke="#10B981" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="1.4s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="310" y2="290" stroke="#F59E0B" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="1.6s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="200" y2="340" stroke="#EC4899" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="1.8s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="90" y2="290" stroke="#14B8A6" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="60" y2="200" stroke="#6366F1" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="2.2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="90" y2="110" stroke="#EF4444" strokeWidth="1" opacity="0.4" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" from="0" to="12" dur="2.4s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* Integration Circles */}
            {[
              { name: "Slack", color: "from-purple-500 to-purple-600", position: "top-0 left-1/2 -translate-x-1/2" },
              { name: "Google Workspace", color: "from-blue-500 to-cyan-500", position: "top-[12%] right-[8%]" },
              { name: "Microsoft 365", color: "from-blue-600 to-blue-700", position: "top-1/2 -translate-y-1/2 right-0" },
              { name: "Zoom", color: "from-blue-400 to-blue-500", position: "bottom-[12%] right-[8%]" },
              { name: "LinkedIn", color: "from-blue-700 to-blue-800", position: "bottom-0 left-1/2 -translate-x-1/2" },
              { name: "Indeed", color: "from-blue-500 to-indigo-600", position: "bottom-[12%] left-[8%]" },
              { name: "Gusto", color: "from-emerald-500 to-teal-500", position: "top-1/2 -translate-y-1/2 left-0" },
              { name: "BambooHR", color: "from-green-500 to-emerald-500", position: "top-[12%] left-[8%]" },
            ].map((integration) => (
              <div
                key={integration.name}
                className={`absolute ${integration.position} w-20 h-20 rounded-full bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer z-20`}
              >
                <div className="text-center text-white">
                  <p className="text-[10px] font-bold leading-tight">{integration.name.split(" ")[0]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Plus 50+ more integrations available •{' '}
              <span className="text-blue-400 font-medium cursor-pointer hover:underline">View All Integrations</span>
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              How TalentFlow works
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              From job posting to onboarding, our AI agents handle the entire process automatically.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-4">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <div className="text-sm text-blue-400 font-mono mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 w-8 text-slate-600">
                      <ChevronRight size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-20 rounded-2xl bg-white/5 border border-white/10 p-8">
            <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
              {["Recruitment", "Screening", "Interview", "Onboarding", "Payroll", "Compliance", "Performance", "Learning", "Exit"].map((agent) => (
                <div key={agent} className="text-center group cursor-pointer">
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 transition-all group-hover:scale-110 group-hover:border-blue-500/50">
                    <Bot size={20} className="text-blue-400" />
                  </div>
                  <p className="text-xs font-medium text-slate-300">{agent}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Loved by HR teams worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our customers have to say about TalentFlow.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your HR?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ companies using TalentFlow AI to automate their HR workflows.
            Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-base font-semibold transition-all hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
