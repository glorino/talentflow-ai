"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Receipt,
  Download,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 14500,
    period: "per employee/month",
    gradient: "from-blue-500 to-blue-600",
    cardClass: "stat-card-blue",
    features: [
      "Up to 50 employees",
      "3 AI Agents",
      "Basic recruitment",
      "Payroll processing",
      "Leave management",
      "Email support",
      "Standard integrations",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 29000,
    period: "per employee/month",
    gradient: "from-purple-500 to-purple-600",
    cardClass: "stat-card-purple",
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
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 59000,
    period: "per employee/month",
    gradient: "from-amber-500 to-orange-500",
    cardClass: "stat-card-amber",
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
  },
];

const PAYMENT_HISTORY = [
  {
    id: 1,
    date: "2026-06-01",
    amount: 143500,
    status: "successful",
    reference: "TF-2026-0601-001",
    description: "Professional Plan - June 2026",
  },
  {
    id: 2,
    date: "2026-05-01",
    amount: 143500,
    status: "successful",
    reference: "TF-2026-0501-002",
    description: "Professional Plan - May 2026",
  },
  {
    id: 3,
    date: "2026-04-01",
    amount: 143500,
    status: "successful",
    reference: "TF-2026-0401-003",
    description: "Professional Plan - April 2026",
  },
  {
    id: 4,
    date: "2026-03-15",
    amount: 29000,
    status: "pending",
    reference: "TF-2026-0315-004",
    description: "Plan Upgrade - Starter to Professional",
  },
  {
    id: 5,
    date: "2026-03-01",
    amount: 59000,
    status: "failed",
    reference: "TF-2026-0301-005",
    description: "Starter Plan - March 2026",
  },
  {
    id: 6,
    date: "2026-02-01",
    amount: 59000,
    status: "successful",
    reference: "TF-2026-0201-006",
    description: "Starter Plan - February 2026",
  },
];

const INVOICES = [
  { id: "INV-2026-0601", date: "2026-06-01", amount: 143500, status: "paid" },
  { id: "INV-2026-0501", date: "2026-05-01", amount: 143500, status: "paid" },
  { id: "INV-2026-0401", date: "2026-04-01", amount: 143500, status: "paid" },
  { id: "INV-2026-0315", date: "2026-03-15", amount: 29000, status: "pending" },
  { id: "INV-2026-0301", date: "2026-03-01", amount: 59000, status: "failed" },
  { id: "INV-2026-0201", date: "2026-02-01", amount: 59000, status: "paid" },
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("professional");
  const [planStatus, setPlanStatus] = useState<"active" | "trial" | "cancelled">("active");
  const [employeeCount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<"success" | "failure" | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/js/flutterwave.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const activePlan = PLANS.find((p) => p.id === currentPlan)!;
  const monthlyCost = activePlan.price * employeeCount;
  const perEmployeeCost = activePlan.price;
  const nextBillingDate = "2026-07-01";

  const handleCheckout = async (planId: string) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) return;

    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          amount: plan.price * employeeCount,
          employeeCount,
        }),
      });
      const data = await res.json();

      if (data.url) {
        const popup = window.open(
          data.url,
          "flutterwave-checkout",
          "width=500,height=700,scrollbars=yes"
        );

        const pollTimer = setInterval(() => {
          try {
            if (popup?.closed) {
              clearInterval(pollTimer);
              verifyPayment(data.tx_ref);
            }
          } catch {
            // Cross-origin, keep polling
          }
        }, 1000);
      }
    } catch {
      setPaymentResult("failure");
      setTimeout(() => setPaymentResult(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (txRef: string) => {
    try {
      const res = await fetch(`/api/billing/verify?tx_ref=${txRef}`);
      const data = await res.json();

      if (data.success) {
        setCurrentPlan(PLANS.find((p) => p.id === currentPlan) ? currentPlan : currentPlan);
        setPaymentResult("success");
        setTimeout(() => setPaymentResult(null), 4000);
      } else {
        setPaymentResult("failure");
        setTimeout(() => setPaymentResult(null), 4000);
      }
    } catch {
      setPaymentResult("failure");
      setTimeout(() => setPaymentResult(null), 4000);
    }
  };

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription? You will lose access at the end of the billing period.")) {
      setPlanStatus("cancelled");
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "badge-success",
      trial: "badge-info",
      cancelled: "badge-danger",
      successful: "badge-success",
      pending: "badge-warning",
      failed: "badge-danger",
      paid: "badge-success",
    };
    return styles[status] || "badge-neutral";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription plan, payments, and invoices
        </p>
      </div>

      {/* Payment Result Toast */}
      {paymentResult && (
        <div
          className={cn(
            "fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl transition-all duration-300",
            paymentResult === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          )}
        >
          {paymentResult === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <span className="text-sm font-medium">
            {paymentResult === "success"
              ? "Payment successful! Your plan has been updated."
              : "Payment failed. Please try again."}
          </span>
        </div>
      )}

      {/* Current Plan Section */}
      <div className="card-enterprise overflow-hidden">
        <div className="relative bg-gradient-to-r from-violet-600 via-primary to-accent p-8 text-white">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -right-5 -bottom-5 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute left-1/2 -top-16 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-xl font-bold">Current Plan</h2>
            </div>
            <p className="text-white/70 text-sm">Your subscription details and billing information</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Plan Name & Status */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{activePlan.name}</span>
                <span className={cn("text-[10px] font-semibold uppercase", statusBadge(planStatus))}>
                  {planStatus}
                </span>
              </div>
            </div>

            {/* Monthly Cost */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly Cost</p>
              <p className="text-2xl font-bold">₦{monthlyCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {employeeCount} employees &times; ₦{perEmployeeCost.toLocaleString()}/mo
              </p>
            </div>

            {/* Next Billing Date */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next Billing Date</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{new Date(nextBillingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => document.getElementById("plans-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-primary px-4 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Change Plan
                  <ArrowRight className="h-4 w-4" />
                </button>
                {planStatus === "active" && (
                  <button
                    onClick={handleCancelSubscription}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-all duration-200"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Upgrade Cards */}
      <div id="plans-section">
        <h2 className="text-lg font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlan;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative overflow-hidden rounded-xl border transition-all duration-300",
                  isCurrent
                    ? "border-primary ring-2 ring-primary/20 shadow-lg"
                    : "hover:shadow-lg hover:-translate-y-1"
                )}
              >
                {isCurrent && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1">
                    <span className="text-xs font-bold text-white">Current Plan</span>
                  </div>
                )}

                {/* Card Header */}
                <div className={cn("relative bg-gradient-to-br p-6 text-white", plan.gradient)}>
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                  <div className="absolute -right-2 bottom-2 h-16 w-16 rounded-full bg-white/5" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">₦{plan.price.toLocaleString()}</span>
                      <span className="text-sm text-white/70">/{plan.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/80">
                      ₦{(plan.price * employeeCount).toLocaleString()}/mo for {employeeCount} employees
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="bg-card p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => !isCurrent && handleCheckout(plan.id)}
                    disabled={isCurrent || loading}
                    className={cn(
                      "mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200",
                      isCurrent
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : cn(
                            "text-white shadow-md hover:shadow-lg active:scale-[0.98]",
                            `bg-gradient-to-r ${plan.gradient}`
                          )
                    )}
                  >
                    {isCurrent ? (
                      "Current Plan"
                    ) : loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        Subscribe Now
                        <ExternalLink className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment History */}
      <div className="card-enterprise overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Payment History</h2>
          </div>
          <button className="text-sm text-primary hover:underline font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_HISTORY.map((payment) => (
                <tr key={payment.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    {new Date(payment.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{payment.description}</td>
                  <td className="px-6 py-4 text-sm font-semibold">₦{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-semibold uppercase", statusBadge(payment.status))}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-mono text-xs">{payment.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice History & Payment Methods */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Invoice History */}
        <div className="card-enterprise overflow-hidden">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Invoices</h2>
            </div>
          </div>
          <div className="divide-y">
            {INVOICES.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{invoice.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">₦{invoice.amount.toLocaleString()}</p>
                    <span className={cn("text-[10px] font-semibold uppercase", statusBadge(invoice.status))}>
                      {invoice.status}
                    </span>
                  </div>
                  <button className="rounded-lg border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card-enterprise overflow-hidden">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Payment Methods</h2>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Add New
            </button>
          </div>
          <div className="p-6 space-y-4">
            {/* Saved Card */}
            <div className="flex items-center justify-between rounded-xl border p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
                  <span className="text-xs font-bold text-white tracking-wider">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/2028</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-success text-[10px]">Default</span>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Edit</button>
              </div>
            </div>

            {/* Add Payment Method */}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/20 p-6 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200">
              <Plus className="h-5 w-5" />
              Add Payment Method
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Your payment information is encrypted and securely stored. We never store your full card number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
