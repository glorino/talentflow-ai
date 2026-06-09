"use client";

import {
  Users,
  Search,
  Filter,
  UserPlus,
  FileText,
  Star,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "AI-powered candidate search with keyword matching and semantic understanding",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: UserPlus,
    title: "Quick Add",
    description: "Add new candidates in seconds with our streamlined onboarding flow",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description: "Filter candidates by skills, experience, location, and more",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FileText,
    title: "Resume Parsing",
    description: "Automatic resume parsing and data extraction with AI assistance",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Star,
    title: "Talent Pool",
    description: "Build and manage your talent pool for future hiring needs",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Team collaboration tools for candidate evaluation and feedback",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Candidate Management</h1>
        <p className="text-muted-foreground">
          Track and manage your candidate pipeline from application to hire
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mt-2 text-blue-100">This feature is under development</p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-5 -bottom-5 h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Feature Cards */}
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
