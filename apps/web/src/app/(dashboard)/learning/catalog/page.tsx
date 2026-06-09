"use client";

import {
  Search,
  Filter,
  BookOpen,
  Star,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "AI-powered search to find the right courses for your needs",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Filter,
    title: "Category Filters",
    description: "Filter courses by category, skill level, and duration",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: BookOpen,
    title: "Curated Paths",
    description: "Pre-built learning paths for career development goals",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Discover the highest-rated courses by the community",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Trending Topics",
    description: "Stay current with trending topics in your industry",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Team Recommendations",
    description: "Courses recommended based on team skill gaps",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function LearningCatalogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Catalog</h1>
        <p className="text-muted-foreground">
          Discover courses and learning resources tailored to your needs
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
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
