"use client";

import {
  Shield,
  FileText,
  Settings,
  Users,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "Leave Types",
    description: "Define and manage different leave types with custom rules",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FileText,
    title: "Policy Documents",
    description: "Attach and version control leave policy documents",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Settings,
    title: "Accrual Rules",
    description: "Configure automatic leave accrual policies by tenure",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Role-Based Policies",
    description: "Different leave entitlements for different employee categories",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Clock,
    title: "Carryover Rules",
    description: "Configure year-end carryover limits and expiration rules",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: AlertTriangle,
    title: "Compliance Checks",
    description: "Ensure leave policies comply with local labor regulations",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function LeavePolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leave Policy</h1>
        <p className="text-muted-foreground">
          Configure and manage your organization's leave policies
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mt-2 text-emerald-100">This feature is under development</p>
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
