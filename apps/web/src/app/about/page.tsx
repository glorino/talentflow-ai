"use client";

import Link from "next/link";
import MarketingLayout from "@/components/marketing-layout";
import {
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Heart,
  Globe,
  Building2,
  Award,
  Zap,
} from "lucide-react";

const team = [
  { name: "Alex Chen", role: "CEO & Co-founder", avatar: "AC", bio: "Former VP of HR at Google. 15+ years in HR tech." },
  { name: "Sarah Kim", role: "CTO & Co-founder", avatar: "SK", bio: "Ex-ML lead at OpenAI. Passionate about AI for good." },
  { name: "James Wilson", role: "VP of Product", avatar: "JW", bio: "Built HR platforms at Workday and BambooHR." },
  { name: "Maria Rodriguez", role: "VP of Engineering", avatar: "MR", bio: "Scaled engineering teams at Stripe and Airbnb." },
  { name: "David Kim", role: "Head of AI", avatar: "DK", bio: "PhD in ML from Stanford. Published 20+ papers." },
  { name: "Emily Taylor", role: "Head of Design", avatar: "ET", bio: "Design lead at Figma. Obsessed with UX." },
];

const values = [
  { icon: Heart, title: "People First", description: "Technology should serve people, not the other way around." },
  { icon: Target, title: "Precision", description: "We obsess over accuracy and reliability in everything we build." },
  { icon: Zap, title: "Innovation", description: "Pushing boundaries with AI to solve real HR challenges." },
  { icon: Globe, title: "Inclusivity", description: "Building tools that work for everyone, everywhere." },
];

const milestones = [
  { year: "2021", event: "Founded", desc: "TalentFlow AI was born from a shared frustration with outdated HR tools." },
  { year: "2022", event: "Seed Round", desc: "Raised $5M from Sequoia Capital to build the AI HR platform." },
  { year: "2023", event: "Series A", desc: "Raised $25M and launched with 9 AI agents." },
  { year: "2024", event: "500 Customers", desc: "Reached 500 companies and 1M employees managed." },
  { year: "2025", event: "Global Expansion", desc: "Expanded to EU and APAC with SOC2 and GDPR compliance." },
  { year: "2026", event: "Series B", desc: "Raised $100M to redefine the future of HR." },
];

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm mb-6">
              <Sparkles size={14} className="text-primary" />
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              We&apos;re on a mission to
              <span className="text-primary"> humanize HR</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              TalentFlow AI was founded in 2021 by a team of HR veterans and AI researchers
              who believed that technology should make work better for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-blue-100">
                To empower every organization with intelligent HR tools that save time,
                reduce bias, and help people thrive at work.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-3xl font-bold">1.2M+</p>
                  <p className="text-sm text-blue-100">Employees Managed</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm text-blue-100">Companies</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-8">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                A world where HR teams spend less time on administrative tasks and more time
                on what matters most — supporting their people.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "AI handles the repetitive work",
                  "HR focuses on strategy and culture",
                  "Employees get better experiences",
                  "Companies make data-driven decisions",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      <Sparkles size={14} />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="mt-4 text-muted-foreground">
              Key milestones on our path to redefining HR.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={milestone.year} className={`relative flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-4 border-primary bg-background" />
                  <div className="w-1/2">
                    <div className={`rounded-xl border bg-card p-6 ${i % 2 === 0 ? "mr-8" : "ml-8"}`}>
                      <div className="text-sm font-bold text-primary mb-1">{milestone.year}</div>
                      <h3 className="font-semibold mb-1">{milestone.event}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet the Team</h2>
            <p className="mt-4 text-muted-foreground">
              The people building the future of HR.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border bg-card p-6 text-center hover:shadow-lg transition-all">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-bold text-white">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join us on our mission
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            We&apos;re always looking for talented people who share our passion for improving HR.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-base font-semibold transition-all hover:bg-white/10"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
