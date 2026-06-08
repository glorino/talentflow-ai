"use client";

import {
  Bot,
  Brain,
  Shield,
  BarChart3,
  Clock,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Target,
  Sparkles,
  Eye,
  Globe,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const agentFeatures = [
  {
    icon: Bot,
    name: "Recruitment Agent",
    description: "Sources candidates, optimizes job postings, and manages the entire hiring pipeline.",
    metrics: { tasksCompleted: "12,450+", accuracy: "94%", avgTime: "2.3s" },
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Target,
    name: "Screening Agent",
    description: "AI-powered resume analysis, candidate ranking, and bias-free screening.",
    metrics: { tasksCompleted: "45,200+", accuracy: "91%", avgTime: "1.8s" },
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Clock,
    name: "Interview Agent",
    description: "Smart scheduling, question generation, and interview feedback analysis.",
    metrics: { tasksCompleted: "8,900+", accuracy: "96%", avgTime: "3.1s" },
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    name: "Onboarding Agent",
    description: "Personalized onboarding plans, task tracking, and new hire check-ins.",
    metrics: { tasksCompleted: "3,200+", accuracy: "98%", avgTime: "1.5s" },
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: TrendingUp,
    name: "Payroll Agent",
    description: "Automated payroll verification, anomaly detection, and cost optimization.",
    metrics: { tasksCompleted: "28,100+", accuracy: "99%", avgTime: "4.2s" },
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Shield,
    name: "Compliance Agent",
    description: "Real-time regulatory monitoring, training tracking, and audit preparation.",
    metrics: { tasksCompleted: "15,600+", accuracy: "97%", avgTime: "2.0s" },
    color: "from-red-500 to-rose-500",
  },
  {
    icon: BarChart3,
    name: "Performance Agent",
    description: "360° feedback analysis, goal tracking, and retention prediction.",
    metrics: { tasksCompleted: "9,800+", accuracy: "88%", avgTime: "2.8s" },
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Brain,
    name: "Learning Agent",
    description: "Personalized learning paths, skill gap analysis, and training recommendations.",
    metrics: { tasksCompleted: "6,400+", accuracy: "92%", avgTime: "1.9s" },
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Eye,
    name: "Exit Agent",
    description: "Offboarding automation, exit interview analysis, and attrition insights.",
    metrics: { tasksCompleted: "2,100+", accuracy: "95%", avgTime: "2.5s" },
    color: "from-gray-500 to-gray-600",
  },
];

const platformFeatures = [
  {
    category: "Recruitment",
    features: [
      "AI-optimized job descriptions",
      "Multi-platform job posting",
      "Candidate scoring & ranking",
      "Automated interview scheduling",
      "Offer letter generation",
      "Recruitment analytics dashboard",
    ],
  },
  {
    category: "Employee Management",
    features: [
      "Digital employee profiles",
      "Org chart visualization",
      "Document management",
      "Onboarding checklists",
      "Offboarding workflows",
      "Employee self-service portal",
    ],
  },
  {
    category: "Payroll & Benefits",
    features: [
      "Automated payroll processing",
      "Tax calculations & filings",
      "Benefits administration",
      "Expense management",
      "Salary benchmarking",
      "Compensation analytics",
    ],
  },
  {
    category: "Compliance",
    features: [
      "Regulatory monitoring",
      "Training tracking",
      "Certification management",
      "Audit trail logging",
      "Policy acknowledgment",
      "Compliance reporting",
    ],
  },
];

const integrations = [
  { name: "Slack", category: "Communication" },
  { name: "Microsoft Teams", category: "Communication" },
  { name: "Zoom", category: "Video" },
  { name: "Google Workspace", category: "Productivity" },
  { name: "Microsoft 365", category: "Productivity" },
  { name: "Okta", category: "Security" },
  { name: "AWS", category: "Infrastructure" },
  { name: "Stripe", category: "Payments" },
  { name: "DocuSign", category: "Documents" },
  { name: "LinkedIn", category: "Recruiting" },
  { name: "Indeed", category: "Recruiting" },
  { name: "Gusto", category: "Payroll" },
];

export default function FeaturesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm mb-6">
            <Sparkles size={14} className="text-primary" />
            <span>9 AI Agents Working 24/7</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Features that
            <span className="text-primary"> redefine HR</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            TalentFlow combines enterprise-grade HR tools with cutting-edge AI to automate
            every aspect of your workforce management.
          </p>
        </div>
      </section>

      {/* AI Agents Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet Your AI Team</h2>
            <p className="mt-4 text-muted-foreground">
              9 specialized AI agents, each trained on millions of HR interactions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agentFeatures.map((agent) => {
              const Icon = agent.icon;
              return (
                <div key={agent.name} className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${agent.color} mb-4 transition-transform group-hover:scale-110`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(agent.metrics).map(([key, value]) => (
                      <div key={key} className="rounded-lg bg-muted/50 p-2 text-center">
                        <p className="text-sm font-bold">{value}</p>
                        <p className="text-[10px] text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features with Infographics */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Complete HR Platform</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need in one unified platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {platformFeatures.map((category) => (
              <div key={category.category} className="rounded-2xl border bg-card p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infographic: HR Automation */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Automate <span className="text-primary">80% of HR tasks</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our AI agents handle repetitive tasks so your HR team can focus on strategic initiatives.
              </p>
              <div className="space-y-4">
                {[
                  { task: "Resume Screening", before: "45 min", after: "30 sec", improvement: "99%" },
                  { task: "Payroll Processing", before: "3 days", after: "30 min", improvement: "97%" },
                  { task: "Compliance Checks", before: "2 days", after: "1 hour", improvement: "96%" },
                  { task: "Onboarding Setup", before: "1 week", after: "2 hours", improvement: "94%" },
                ].map((item) => (
                  <div key={item.task} className="flex items-center gap-4 rounded-xl border p-4">
                    <div className="flex-1">
                      <p className="font-medium">{item.task}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-red-500 line-through">{item.before}</span>
                        <ArrowRight size={14} className="text-emerald-500" />
                        <span className="text-sm text-emerald-600 font-semibold">{item.after}</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                      -{item.improvement}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
              <h3 className="text-lg font-semibold mb-6">AI Processing Pipeline</h3>
              <div className="space-y-4">
                {[
                  { step: "Data Ingestion", status: "complete", time: "0.2s" },
                  { step: "AI Analysis", status: "complete", time: "1.4s" },
                  { step: "Pattern Recognition", status: "complete", time: "0.8s" },
                  { step: "Insight Generation", status: "active", time: "0.3s" },
                  { step: "Report Delivery", status: "pending", time: "0.1s" },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                      item.status === "complete" ? "bg-emerald-500 text-white" :
                      item.status === "active" ? "bg-blue-500 text-white animate-pulse" :
                      "bg-white/10 text-slate-400"
                    )}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.step}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Processing Time</span>
                  <span className="text-lg font-bold text-emerald-400">2.8s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Integrates with your tools</h2>
            <p className="mt-4 text-muted-foreground">
              Connect with 100+ tools your team already uses.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrations.map((integration) => (
              <div key={integration.name} className="group rounded-xl border bg-card p-4 text-center transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {integration.name.charAt(0)}
                </div>
                <p className="text-sm font-medium">{integration.name}</p>
                <p className="text-[10px] text-muted-foreground">{integration.category}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View all 100+ integrations <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Lock, label: "SOC2 Type II", desc: "Certified" },
                  { icon: Shield, label: "GDPR", desc: "Compliant" },
                  { icon: Globe, label: "256-bit", desc: "Encryption" },
                  { icon: Eye, label: "99.99%", desc: "Uptime SLA" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <Icon size={20} className="text-blue-400 mb-2" />
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Enterprise-grade <span className="text-primary">security</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Your data is protected by the highest security standards. We are SOC2 Type II certified,
                GDPR compliant, and use 256-bit encryption at rest and in transit.
              </p>
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all data",
                  "Role-based access control (RBAC)",
                  "Audit logging for all actions",
                  "Regular penetration testing",
                  "Data residency options (US, EU, APAC)",
                  "SSO & MFA support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
