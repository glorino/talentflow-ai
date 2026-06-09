"use client";

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "Smart Recommendations",
    description: "AI-generated insights for talent decisions and workforce planning",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Trend Detection",
    description: "Automatic detection of workforce trends and anomalies",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: AlertTriangle,
    title: "Risk Prediction",
    description: "Predict flight risk, performance issues, and engagement drops",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Lightbulb,
    title: "Actionable Insights",
    description: "Convert data patterns into recommended actions for HR teams",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Workforce Analytics",
    description: "Deep analytics on hiring, retention, and organizational health",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Natural Language",
    description: "Ask questions in plain English and get instant data-driven answers",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-muted-foreground">
          AI-powered analytics and recommendations for smarter HR decisions
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mt-2 text-blue-100">This feature is under development</p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-5 -bottom-5 h-24 w-24 rounded-full bg-white/10" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white", feature.gradient)}>
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            <div className="mt-4 flex items-center text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
