import { NextRequest, NextResponse } from "next/server";
import { db, payments, subscriptions } from "@/lib/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY!;

function verifySignature(payload: string, signature: string): boolean {
  const secretHash = crypto.createHash("sha512").update(FLW_SECRET_KEY + payload).digest("hex");
  return secretHash === signature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("verif-hash") || request.headers.get("x-flutterwave-signature") || "";

    if (!verifySignature(body, signature)) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const { event, data } = payload;

    if (event === "charge.completed" && data) {
      const txRef = data.tx_ref;
      const existingPayment = await db.select().from(payments).where(eq(payments.flutterwaveTxRef, txRef)).limit(1);

      if (existingPayment.length) {
        const payment = existingPayment[0];
        const isSuccessful = data.status === "successful";

        await db.update(payments).set({
          status: isSuccessful ? "successful" : "failed",
          flutterwaveResponse: payload,
          verifiedAt: new Date(),
        }).where(eq(payments.id, payment.id));

        if (isSuccessful) {
          const existingSub = await db.select().from(subscriptions)
            .where(eq(subscriptions.companyId, payment.companyId))
            .limit(1);

          if (!existingSub.length) {
            const nextBilling = new Date();
            nextBilling.setMonth(nextBilling.getMonth() + 1);

            await db.insert(subscriptions).values({
              companyId: payment.companyId,
              plan: payment.plan,
              status: "active",
              flutterwaveCustomerCode: String(data.customer?.id),
              amount: payment.amount,
              currency: payment.currency,
              startDate: new Date(),
              nextBillingDate: nextBilling,
            });
          } else {
            await db.update(subscriptions).set({
              status: "active",
              plan: payment.plan,
              updatedAt: new Date(),
            }).where(eq(subscriptions.companyId, payment.companyId));
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Webhook processing failed" },
      { status: 500 }
    );
  }
}
