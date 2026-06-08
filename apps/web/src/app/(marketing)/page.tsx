"use client";

import Link from "next/link";
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
  { value: "500+", label: "Companies", icon: Building2 },
  { value: "1.2M", label: "Employees Managed", icon: Users },
  { value: "99.9%", label: "Uptime", icon: Zap },
  { value: "4.9/5", label: "Customer Rating", icon: Star },
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

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
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

            {/* Social Proof */}
            <div className="mt-16">
              <p className="text-sm text-muted-foreground mb-4">Trusted by 500+ companies worldwide</p>
              <div className="flex items-center justify-center gap-8 opacity-40">
                {logos.map((logo) => (
                  <span key={logo} className="text-lg font-bold text-gray-400">{logo}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image - Dashboard Preview */}
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
                {/* Mini Dashboard Preview */}
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

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
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

          {/* AI Agent Visualization */}
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
    </div>
  );
}
