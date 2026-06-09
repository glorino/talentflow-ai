import { NextRequest, NextResponse } from "next/server";
import { db, subscriptions, payments, companies } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const companyId = request.headers.get("x-company-id");
    if (!companyId) {
      return NextResponse.json(
        { success: false, error: "Company ID required" },
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

    const companySubscriptions = await db.select().from(subscriptions)
      .where(eq(subscriptions.companyId, companyId))
      .orderBy(desc(subscriptions.createdAt));

    const recentPayments = await db.select().from(payments)
      .where(eq(payments.companyId, companyId))
      .orderBy(desc(payments.createdAt))
      .limit(10);

    const currentSubscription = companySubscriptions[0] || null;

    const invoices = recentPayments
      .filter((p) => p.status === "successful")
      .map((p) => ({
        id: p.id,
        date: p.verifiedAt || p.createdAt,
        amount: p.amount,
        currency: p.currency,
        plan: p.plan,
        status: p.status,
        txRef: p.flutterwaveTxRef,
      }));

    return NextResponse.json({
      success: true,
      data: {
        subscription: currentSubscription,
        recentPayments,
        invoices,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
