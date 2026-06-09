"use client";

import {
  Star,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Star,
    title: "Rating Scales",
    description: "Customizable rating scales with competency-based evaluations",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "360 Feedback",
    description: "Multi-rater feedback from managers, peers, and direct reports",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Calendar,
    title: "Review Cycles",
    description: "Schedule and manage annual, quarterly, or custom review cycles",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: FileText,
    title: "Review Templates",
    description: "Pre-built and customizable review templates for each role",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "Manager Tools",
    description: "Calibration tools to ensure fair and consistent evaluations",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Track performance trends and growth over multiple review cycles",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function PerformanceReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance Reviews</h1>
        <p className="text-muted-foreground">
          Conduct and manage structured performance review cycles
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mt-2 text-amber-100">This feature is under development</p>
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
