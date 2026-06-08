"use client";

import MarketingLayout from "@/components/marketing-layout";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  Heart,
  Eye,
  Target,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  GraduationCap,
  Calendar,
  Users,
  Sparkles,
  Zap,
  Globe,
  Star,
} from "lucide-react";

const stats = [
  { label: "Team Members", value: "50+", icon: Users },
  { label: "Countries", value: "12", icon: Globe },
  { label: "Glassdoor Rating", value: "4.8", icon: Star },
  { label: "Retention Rate", value: "95%", icon: Heart },
];

const values = [
  {
    title: "Innovation",
    description:
      "We push boundaries with AI-driven solutions that transform how companies manage their most valuable asset — their people.",
    icon: Lightbulb,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "People First",
    description:
      "Every feature we build starts with empathy. We believe great HR tools empower both the organization and every individual within it.",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Transparency",
    description:
      "We operate with openness and honesty — with our team, our customers, and the data we handle. Trust is the foundation of everything.",
    icon: Eye,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Impact",
    description:
      "We measure success by the tangible difference we make — happier employees, fairer workplaces, and stronger organizations worldwide.",
    icon: Target,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

const departments: Record<string, { gradient: string; badge: string }> = {
  Engineering: {
    gradient: "from-blue-500 to-indigo-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  Product: {
    gradient: "from-purple-500 to-violet-500",
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  },
  AI: {
    gradient: "from-cyan-500 to-blue-500",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
  },
  Advisory: {
    gradient: "from-emerald-500 to-green-500",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  Infrastructure: {
    gradient: "from-orange-500 to-red-500",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  },
  Design: {
    gradient: "from-pink-500 to-rose-500",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
  },
  Sales: {
    gradient: "from-amber-500 to-yellow-500",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
};

const jobs = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Remote",
  },
  {
    title: "ML Research Scientist",
    department: "AI",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Remote",
  },
  {
    title: "HR Industry Expert",
    department: "Advisory",
    location: "Remote",
    type: "Remote",
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Austin, TX",
    type: "Full-time",
  },
  {
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    title: "Sales Executive",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
  },
];

const benefits = [
  {
    title: "Health Insurance",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
    icon: Shield,
  },
  {
    title: "Equity",
    description: "Meaningful stock options so you share in the success you help create.",
    icon: Zap,
  },
  {
    title: "Learning Budget",
    description: "Annual stipend for courses, conferences, and professional development.",
    icon: GraduationCap,
  },
  {
    title: "Flexible Hours",
    description: "Work when you're most productive — we trust you to manage your time.",
    icon: Clock,
  },
  {
    title: "Remote Work",
    description: "Work from anywhere in the world with our distributed-first culture.",
    icon: Globe,
  },
  {
    title: "Team Events",
    description: "Regular offsites, socials, and team-building activities to stay connected.",
    icon: Calendar,
  },
];

export default function CareersPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:bg-black/40">
            <Sparkles size={14} className="text-purple-500" />
            We&apos;re hiring across 12 countries
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Join Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Help us build the future of HR with AI. We&apos;re on a mission to make every
            workplace fairer, more efficient, and more human.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#positions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
            >
              View Open Positions
              <ArrowRight size={16} />
            </a>
            <a
              href="#values"
              className="inline-flex items-center gap-2 rounded-xl border bg-white/80 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white dark:bg-black/40 dark:hover:bg-black/60"
            >
              Our Values
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center gap-2 py-12 text-center",
                  i < stats.length - 1 && "md:border-r"
                )}
              >
                <Icon
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
                <span className="text-3xl font-bold md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              These core principles guide every decision we make, every feature we
              build, and every person we hire.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                      value.bgColor
                    )}
                  >
                    <Icon size={22} className={value.textColor} />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Open{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Positions
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Find the role that fits your passion and expertise. We&apos;re always looking
              for exceptional people to join our mission.
            </p>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => {
              const dept = departments[job.department];
              return (
                <div
                  key={job.title}
                  className={cn(
                    "group relative flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md",
                    "overflow-hidden"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                      dept.gradient
                    )}
                  />
                  <div className="flex-1">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                        dept.badge
                      )}
                    >
                      {job.department}
                    </span>
                    <h3 className="mt-3 text-base font-semibold">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 w-full rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                    Apply
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Perks &{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We take care of our team so they can focus on doing their best work.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMSAxLTQgMCAyIDIgMCAwIDEgNCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Don&apos;t See Your Role?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-blue-100">
                We&apos;re always interested in hearing from talented people. Send us your
                resume and tell us how you&apos;d make an impact.
              </p>
              <a
                href="mailto:careers@talentflow.ai"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
              >
                Send Your Resume
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
