import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY!;
const PAYMONGO_BASE = "https://api.paymongo.com/v1";

const planPrices: Record<string, number> = {
  monthly: 19900,    // ₱199.00 in centavos
  quarterly: 49900,  // ₱499.00 in centavos
  yearly: 159900,    // ₱1,599.00 in centavos
};

const planDays: Record<string, number> = {
  monthly: 30,
  quarterly: 90,
  yearly: 365,
};

// POST — create PayMongo checkout session
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    const { plan, method } = await req.json();

    if (!planPrices[plan]) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const amount = planPrices[plan];
    const userId = (session.user as any).id;
    const userEmail = session.user.email!;
    const userName = session.user.name || "PinoyHub User";

    // Map method to PayMongo payment method type
    const paymentMethodMap: Record<string, string> = {
      gcash: "gcash",
      maya: "paymaya",
      card: "card",
      bank: "dob",
    };

    const paymentMethodType = paymentMethodMap[method] || "gcash";

    // Create PayMongo Payment Intent
    const intentRes = await fetch(`${PAYMONGO_BASE}/payment_intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET + ":").toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount,
            payment_method_allowed: [paymentMethodType],
            payment_method_options: {
              card: { request_three_d_secure: "any" },
            },
            currency: "PHP",
            capture_type: "automatic",
            description: `PinoyHub Premium - ${plan} plan`,
            statement_descriptor: "PINOYHUB",
            metadata: {
              user_id: userId,
              plan,
              email: userEmail,
            },
          },
        },
      }),
    });

    const intentData = await intentRes.json();

    if (!intentRes.ok) {
      console.error("PayMongo intent error:", intentData);
      return NextResponse.json({ error: "Failed to create payment intent." }, { status: 500 });
    }

    const intentId = intentData.data.id;
    const clientKey = intentData.data.attributes.client_key;

    // Save pending payment to database
    await prisma.payment.create({
      data: {
        user_id: userId,
        amount_centavos: amount,
        method: paymentMethodType,
        status: "pending",
        paymongo_payment_id: intentId,
      },
    });

    return NextResponse.json({
      success: true,
      intentId,
      clientKey,
      amount,
      plan,
    });

  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// GET — check payment status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const intentId = searchParams.get("intentId");
    const plan = searchParams.get("plan") || "monthly";

    if (!intentId) {
      return NextResponse.json({ error: "Missing intentId." }, { status: 400 });
    }

    // Check payment status from PayMongo
    const res = await fetch(`${PAYMONGO_BASE}/payment_intents/${intentId}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET + ":").toString("base64")}`,
      },
    });

    const data = await res.json();
    const status = data.data?.attributes?.status;

    if (status === "succeeded") {
      const userId = (session.user as any).id;

      // Update payment in database
      await prisma.payment.updateMany({
        where: { paymongo_payment_id: intentId },
        data: { status: "paid", paid_at: new Date() },
      });

      // Create or update subscription
      const now = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + planDays[plan]);

      await prisma.subscription.create({
        data: {
          user_id: userId,
          plan,
          status: "active",
          current_period_start: now,
          current_period_end: endDate,
        },
      });

      // Upgrade user role to premium
      await prisma.user.update({
        where: { id: userId },
        data: { role: "premium" },
      });

      return NextResponse.json({ status: "succeeded", upgraded: true });
    }

    return NextResponse.json({ status });

  } catch (error) {
    console.error("Payment check error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}