"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageSquare,
  Building2,
} from "lucide-react";
import MarketingLayout from "@/components/marketing-layout";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "support@talentflow.ai",
    description: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm PST",
  },
  {
    icon: MapPin,
    title: "Office",
    detail: "123 Innovation Drive, San Francisco, CA 94105",
    description: "Visit us anytime",
  },
  {
    icon: Clock,
    title: "Hours",
    detail: "Mon-Fri, 9am-6pm PST",
    description: "Closed on weekends",
  },
];

const subjects = ["General", "Sales", "Support", "Partnership"] as const;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MarketingLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question, want to partner with us, or just want to say
              hello? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-12 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail size={28} className="text-primary" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Message sent!</h2>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setCompany("");
                    setSubject("");
                    setMessage("");
                  }}
                  className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border bg-card p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <MessageSquare size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Send us a message</h2>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below and we&apos;ll get back to you
                      shortly.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="company"
                        className="text-sm font-medium leading-none"
                      >
                        Company
                      </label>
                      <div className="relative">
                        <Building2
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          id="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Corp"
                          className="flex h-10 w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium leading-none"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="flex h-10 w-full appearance-none rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help..."
                      className="flex min-h-[120px] w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 w-full sm:w-auto"
                    )}
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">Contact Information</h2>
            <p className="text-muted-foreground">
              Reach out through any of the channels below or fill out the form.
            </p>

            <div className="mt-6 space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon
                        size={18}
                        className="text-primary transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-foreground">
                        {item.detail}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-primary/10 p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent_60%)]" />
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to transform your HR?
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Join hundreds of companies already using TalentFlow AI to
              streamline their people operations.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Free Trial
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
