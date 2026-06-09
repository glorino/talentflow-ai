import { NextRequest, NextResponse } from "next/server";
import { db, payments, companies } from "@/lib/db";
import { eq } from "drizzle-orm";

const FLUTTERWAVE_BASE = "https://api.flutterwave.com/v3";
const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY!;

const PLAN_PRICES: Record<string, number> = {
  starter: 9,
  professional: 19,
  enterprise: 39,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, name, companyId } = body;

    if (!plan || !email || !name || !companyId) {
      return NextResponse.json(
        { success: false, error: "plan, email, name, and companyId are required" },
        { status: 400 }
      );
    }

    if (!PLAN_PRICES[plan]) {
      return NextResponse.json(
        { success: false, error: "Invalid plan. Must be starter, professional, or enterprise" },
        { status: 400 }
      );
    }

    const company = await db.select().from(companies).where(eq(companies.id, companyId)).limit(1);
    if (!company.length) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }

    const amount = PLAN_PRICES[plan] * 10;
    const txRef = `TF-${companyId.slice(0, 8)}-${Date.now()}`;
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const payment = await db.insert(payments).values({
      companyId,
      flutterwaveTxRef: txRef,
      amount: String(amount),
      currency: "USD",
      status: "pending",
      plan,
      customerEmail: email,
      customerName: name,
    }).returning();

    const flutterwaveResponse = await fetch(`${FLUTTERWAVE_BASE}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount,
        currency: "USD",
        redirect_url: `${origin}/api/billing/verify`,
        customer: { email, name },
        meta: [{ companyId, plan }],
      }),
    });

    const flutterwaveData = await flutterwaveResponse.json();

    if (flutterwaveData.status !== "success") {
      await db.update(payments).set({ status: "failed" }).where(eq(payments.id, payment[0].id));
      return NextResponse.json(
        { success: false, error: "Failed to initialize payment", details: flutterwaveData },
        { status: 500 }
      );
    }

    await db.update(payments).set({
      flutterwaveTxId: String(flutterwaveData.data?.id),
      flutterwaveResponse: flutterwaveData,
    }).where(eq(payments.id, payment[0].id));

    return NextResponse.json({
      success: true,
      data: {
        paymentLink: flutterwaveData.data?.link,
        txRef,
        amount,
        plan,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
