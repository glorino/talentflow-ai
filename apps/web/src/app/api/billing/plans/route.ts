import { NextResponse } from "next/server";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    pricePerEmployee: true,
    currency: "USD",
    interval: "month",
    description: "Perfect for small teams getting started with HR management",
    features: [
      "Up to 25 employees",
      "Basic employee management",
      "Leave tracking",
      "Attendance monitoring",
      "Email support",
      "Basic reporting",
    ],
    maxEmployees: 25,
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 19,
    pricePerEmployee: true,
    currency: "USD",
    interval: "month",
    description: "For growing companies that need advanced HR features",
    features: [
      "Up to 100 employees",
      "Everything in Starter",
      "Performance reviews",
      "Payroll management",
      "Learning management",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    maxEmployees: 100,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 39,
    pricePerEmployee: true,
    currency: "USD",
    interval: "month",
    description: "For large organizations with complex HR needs",
    features: [
      "Unlimited employees",
      "Everything in Professional",
      "AI-powered insights",
      "Compliance management",
      "Custom workflows",
      "Dedicated account manager",
      "SSO integration",
      "Custom integrations",
      "24/7 phone support",
      "SLA guarantee",
    ],
    maxEmployees: null,
    popular: false,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { plans },
  });
}
