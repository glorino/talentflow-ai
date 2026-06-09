import { NextRequest, NextResponse } from "next/server";
import { db, payments, subscriptions, invoices } from "@/lib/db";
import { eq } from "drizzle-orm";

const FLUTTERWAVE_BASE = "https://api.flutterwave.com/v3";
const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transaction_id");
    const txRef = searchParams.get("tx_ref");

    if (!transactionId) {
      return new Response(
        `<html><body><h1>Error</h1><p>Missing transaction_id parameter</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const response = await fetch(`${FLUTTERWAVE_BASE}/transactions/${transactionId}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.status !== "success") {
      return new Response(
        `<html><body><h1>Verification Failed</h1><p>Could not verify transaction.</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const txData = data.data;
    const ref = txData.tx_ref || txRef;

    if (ref) {
      const existingPayment = await db.select().from(payments).where(eq(payments.flutterwaveTxRef, ref)).limit(1);

      if (existingPayment.length) {
        const payment = existingPayment[0];
        const isSuccessful = txData.status === "successful";

        await db.update(payments).set({
          status: isSuccessful ? "successful" : "failed",
          flutterwaveResponse: data,
          verifiedAt: new Date(),
        }).where(eq(payments.id, payment.id));

        if (isSuccessful) {
          const existingSub = await db.select().from(subscriptions)
            .where(eq(subscriptions.companyId, payment.companyId))
            .limit(1);

          if (!existingSub.length) {
            const nextBilling = new Date();
            nextBilling.setMonth(nextBilling.getMonth() + 1);

            const newSub = await db.insert(subscriptions).values({
              companyId: payment.companyId,
              plan: payment.plan,
              status: "active",
              flutterwaveCustomerCode: String(txData.customer?.id),
              amount: payment.amount,
              currency: payment.currency,
              startDate: new Date(),
              nextBillingDate: nextBilling,
            }).returning();

            const invoiceCount = await db.select().from(invoices)
              .where(eq(invoices.companyId, payment.companyId));

            const invoiceNumber = `TF-${String(invoiceCount.length + 1).padStart(4, "0")}`;
            const amount = Number(payment.amount);
            const tax = Math.round(amount * 0.05 * 100) / 100;
            const total = amount + tax;

            await db.insert(invoices).values({
              companyId: payment.companyId,
              subscriptionId: newSub[0]?.id,
              paymentId: payment.id,
              invoiceNumber,
              amount: String(amount),
              tax: String(tax),
              total: String(total),
              status: "paid",
              dueDate: new Date(),
              paidAt: new Date(),
            });
          } else {
            await db.update(subscriptions).set({
              status: "active",
              plan: payment.plan,
              updatedAt: new Date(),
            }).where(eq(subscriptions.companyId, payment.companyId));

            const invoiceCount = await db.select().from(invoices)
              .where(eq(invoices.companyId, payment.companyId));

            const invoiceNumber = `TF-${String(invoiceCount.length + 1).padStart(4, "0")}`;
            const amount = Number(payment.amount);
            const tax = Math.round(amount * 0.05 * 100) / 100;
            const total = amount + tax;

            await db.insert(invoices).values({
              companyId: payment.companyId,
              subscriptionId: existingSub[0]?.id,
              paymentId: payment.id,
              invoiceNumber,
              amount: String(amount),
              tax: String(tax),
              total: String(total),
              status: "paid",
              dueDate: new Date(),
              paidAt: new Date(),
            });
          }
        }
      }
    }

    return new Response(
      `<html>
        <head><title>Payment ${txData.status === "successful" ? "Successful" : "Failed"}</title></head>
        <body style="font-family: system-ui; text-align: center; padding: 60px; background: #f8fafc;">
          <div style="max-width: 400px; margin: 0 auto;">
            <div style="font-size: 48px; margin-bottom: 16px;">${txData.status === "successful" ? "&#10004;" : "&#10006;"}</div>
            <h1 style="color: ${txData.status === "successful" ? "#16a34a" : "#dc2626"}; margin-bottom: 8px;">${txData.status === "successful" ? "Payment Successful!" : "Payment Failed"}</h1>
            <p style="color: #666; margin-bottom: 24px;">${txData.status === "successful" ? "Your subscription has been activated. You can close this window." : "There was an issue with your payment."}</p>
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Reference:</strong> ${ref || "N/A"}</p>
              <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Amount:</strong> ${txData.currency} ${txData.amount}</p>
              ${txData.status === "successful" ? `<p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Invoice:</strong> Generated</p>` : ""}
            </div>
            <script>
              setTimeout(function() {
                window.close();
              }, 4000);
            </script>
          </div>
        </body>
      </html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    return new Response(
      `<html><body><h1>Error</h1><p>Verification failed: ${error instanceof Error ? error.message : "Unknown error"}</p></body></html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
