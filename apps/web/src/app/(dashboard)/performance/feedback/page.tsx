"use client";

import {
  MessageCircle,
  Users,
  Star,
  Shield,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageCircle,
    title: "Feedback Requests",
    description: "Request and give structured feedback from anyone in the org",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Peer Reviews",
    description: "Anonymous peer-to-peer feedback with guided questions",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Star,
    title: "Recognition Kudos",
    description: "Send and receive kudos to recognize great work publicly",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Shield,
    title: "Anonymous Mode",
    description: "Option for fully anonymous feedback to encourage honesty",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Sentiment Analysis",
    description: "AI-powered sentiment analysis of feedback themes",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Feedback Trends",
    description: "Track feedback trends and patterns over time",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">360 Feedback</h1>
        <p className="text-muted-foreground">
          Gather comprehensive feedback from peers, managers, and reports
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mt-2 text-purple-100">This feature is under development</p>
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
