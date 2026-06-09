"use client";

import {
  Target,
  Flag,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Target,
    title: "OKR Tracking",
    description: "Set and track Objectives and Key Results at every level",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Flag,
    title: "Milestones",
    description: "Define milestones and track progress toward each goal",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Calendar,
    title: "Goal Periods",
    description: "Organize goals by quarterly, annual, or custom time periods",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Progress Bars",
    description: "Visual progress indicators with automatic and manual updates",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Team Goals",
    description: "Align individual goals with team and company objectives",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: CheckCircle,
    title: "Completion Tracking",
    description: "Track goal completion rates and celebrate achievements",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Goal Management</h1>
        <p className="text-muted-foreground">
          Set, track, and achieve goals aligned with company objectives
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-white">
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
