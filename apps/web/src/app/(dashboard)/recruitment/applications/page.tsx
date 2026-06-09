"use client";

import {
  FileText,
  CheckCircle,
  Clock,
  Send,
  BarChart3,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FileText,
    title: "Application Forms",
    description: "Customizable application forms with conditional logic and validation",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: CheckCircle,
    title: "Status Tracking",
    description: "Real-time status updates from application to decision",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Clock,
    title: "Timeline View",
    description: "Visual timeline of each application's journey through the pipeline",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Send,
    title: "Auto Responses",
    description: "Automated acknowledgment emails and status notifications to candidates",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Conversion Rates",
    description: "Track conversion rates at each stage of the application process",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: AlertCircle,
    title: "Alerts & Reminders",
    description: "Get notified when applications need attention or review",
    gradient: "from-rose-500 to-pink-500",
  },
];

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Application Tracking</h1>
        <p className="text-muted-foreground">
          Monitor and manage job applications across all open positions
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mt-2 text-indigo-100">This feature is under development</p>
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
