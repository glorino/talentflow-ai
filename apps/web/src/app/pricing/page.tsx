"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MarketingLayout from "@/components/marketing-layout";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Building2,
  Users,
  CreditCard,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: Record<string, unknown>) => void;
  }
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams getting started",
    price: 14500,
    period: "per employee/month",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    cardClass: "card-blue",
    popular: false,
    features: [
      "Up to 50 employees",
      "3 AI Agents",
      "Basic recruitment",
      "Payroll processing",
      "Leave management",
      "Email support",
      "Standard integrations",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing companies",
    price: 29000,
    period: "per employee/month",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    cardClass: "card-purple",
    popular: true,
    features: [
      "Up to 500 employees",
      "6 AI Agents",
      "Advanced recruitment",
      "Full payroll suite",
      "Performance reviews",
      "Compliance engine",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 59000,
    period: "per employee/month",
    icon: Building2,
    color: "from-amber-500 to-orange-500",
    cardClass: "card-amber",
    popular: false,
    features: [
      "Unlimited employees",
      "All 9 AI Agents",
      "AI-powered insights",
      "Custom workflows",
      "Dedicated success manager",
      "SSO & SAML",
      "Custom security policies",
      "API access",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes! All plans come with a 14-day free trial. No credit card required.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. We'll prorate the difference.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards via Flutterwave, supporting Visa, Mastercard, Vodafone MTN, and bank transfers across 30+ countries.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We're SOC2 Type II certified, GDPR compliant, and use 256-bit encryption.",
  },
  {
    q: "Do you offer implementation support?",
    a: "Enterprise plans include dedicated implementation support. Professional plans get access to our onboarding team.",
  },
  {
    q: "What's included in the AI agents?",
    a: "Each AI agent handles a specific HR function - recruitment, screening, payroll, compliance, etc. They learn from your data and improve over time.",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/js/flutterwave.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleSubscribe(planId: string) {
    const plan = plans.find((p) => p.id === planId);
    if (!plan || plan.id === "enterprise") return;
    setSelectedPlan(planId);
    setShowModal(true);
    setError("");
  }

  async function handleCheckout() {
    if (!selectedPlan || !email || !name) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(selectedPlan);
    setError("");

    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          email,
          name,
          companyId: "00000000-0000-0000-0000-000000000001",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to initialize payment");
        setLoading(null);
        return;
      }

      if (window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout({
          public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
          tx_ref: data.data.txRef,
          amount: data.data.amount,
          currency: "NGN",
          payment_options: "card,banktransfer,ussd",
          redirect_url: `${window.location.origin}/api/billing/verify`,
          customer: { email, name },
          customizations: {
            title: "TalentFlow AI",
            description: `${selectedPlan?.charAt(0).toUpperCase()}${selectedPlan?.slice(1)} Plan Subscription`,
            logo: "https://web-glopresc.vercel.app/favicon.ico",
          },
          meta: [
            { company_id: "00000000-0000-0000-0000-000000000001", plan: selectedPlan },
          ],
        });
      } else {
        window.open(data.data.paymentLink, "_blank");
      }

      setShowModal(false);
      setEmail("");
      setName("");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm mb-6">
            <Sparkles size={14} className="text-primary" />
            <span>14-day free trial on all plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, transparent
            <span className="text-primary"> pricing</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your team. All plans include AI agents, core HR features,
            and a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 -mt-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={cn(
                    "rounded-2xl border bg-card p-8 transition-all hover:shadow-lg",
                    plan.popular && "border-primary shadow-lg ring-2 ring-primary/20 scale-105"
                  )}
                >
                  {plan.popular && (
                    <div className="mb-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.color} mb-4`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-bold">₦{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.id === "enterprise" ? (
                    <Link
                      href="/contact"
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all w-full",
                        "border bg-background hover:bg-muted"
                      )}
                    >
                      {plan.cta}
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={loading !== null}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all w-full",
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border bg-background hover:bg-muted",
                        loading === plan.id && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {loading === plan.id ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {plan.cta}
                          <CreditCard size={14} />
                        </>
                      )}
                    </button>
                  )}
                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>
          <div className="rounded-2xl border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Starter</th>
                  <th className="px-6 py-4 text-center font-semibold text-primary">Professional</th>
                  <th className="px-6 py-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Employees", starter: "Up to 50", pro: "Up to 500", enterprise: "Unlimited" },
                  { feature: "AI Agents", starter: "3", pro: "6", enterprise: "All 9" },
                  { feature: "Recruitment", starter: "Basic", pro: "Advanced", enterprise: "AI-Powered" },
                  { feature: "Payroll", starter: "Basic", pro: "Full Suite", enterprise: "Full Suite" },
                  { feature: "Performance Reviews", starter: "-", pro: "360° Feedback", enterprise: "Custom" },
                  { feature: "Compliance", starter: "Basic", pro: "Engine", enterprise: "Advanced" },
                  { feature: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
                  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
                  { feature: "SSO/SAML", starter: "-", pro: "-", enterprise: "Included" },
                  { feature: "API Access", starter: "-", pro: "Limited", enterprise: "Full" },
                ].map((row, i) => (
                  <tr key={row.feature} className={cn("border-b last:border-0", i % 2 === 0 && "bg-muted/30")}>
                    <td className="px-6 py-3 font-medium">{row.feature}</td>
                    <td className="px-6 py-3 text-center text-muted-foreground">{row.starter}</td>
                    <td className="px-6 py-3 text-center font-medium text-primary">{row.pro}</td>
                    <td className="px-6 py-3 text-center text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <button
            onClick={() => handleSubscribe("professional")}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Start Free Trial
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border shadow-2xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Subscribe to {selectedPlan?.charAt(0).toUpperCase()}{selectedPlan?.slice(1)}</h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your details to start your 14-day free trial.               You&apos;ll be charged ₦{plans.find(p => p.id === selectedPlan)?.price.toLocaleString()}/employee/month after the trial.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <button
                onClick={handleCheckout}
                disabled={loading !== null || !email || !name}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  (loading || !email || !name) && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={14} />
                    Start Free Trial
                  </>
                )}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Secured by Flutterwave. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      )}
    </MarketingLayout>
  );
}
