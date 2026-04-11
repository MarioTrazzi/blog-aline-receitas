import { NextRequest, NextResponse } from "next/server";
import { attachPurchaseToMatchingUser } from "@/lib/auth-purchases";
import { prisma } from "@/lib/prisma";
import { paymentClient } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Mercado Pago sends different notification types
    if (body.type === "payment" || body.action === "payment.updated") {
      const paymentId = body.data?.id;

      if (!paymentId) {
        return NextResponse.json({ received: true });
      }

      // Fetch payment details from Mercado Pago
      const payment = await paymentClient.get({ id: paymentId });

      const purchaseId = payment.external_reference;
      if (!purchaseId) {
        return NextResponse.json({ received: true });
      }

      const status = payment.status; // approved, rejected, pending, etc.

      // Update purchase status
      const purchase = await prisma.purchase.update({
        where: { id: purchaseId },
        data: {
          paymentId: String(paymentId),
          paymentStatus: status === "approved" ? "approved" : status === "rejected" ? "rejected" : "pending",
        },
      });

      await attachPurchaseToMatchingUser(purchaseId, purchase.email);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    // Always return 200 to Mercado Pago so it doesn't retry
    return NextResponse.json({ received: true });
  }
}
