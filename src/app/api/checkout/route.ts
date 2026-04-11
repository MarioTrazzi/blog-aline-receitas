import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { preferenceClient } from "@/lib/mercadopago";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const { recipeId, email: rawEmail } = body;
    const email = rawEmail ?? session?.user?.email;

    if (!recipeId || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    const userId = session?.user?.id ?? (
      await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      })
    )?.id;

    // Check if user already purchased this recipe
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        recipeId,
        paymentStatus: "approved",
        OR: [
          { email },
          userId ? { userId } : { id: "" },
        ],
      },
    });

    if (existingPurchase) {
      // Already purchased, return the recipe access URL
      const recipe = await prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      return NextResponse.json({
        alreadyPurchased: true,
        accessUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/receita/${recipe?.slug}?token=${existingPurchase.accessToken}`,
      });
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Receita não encontrada" },
        { status: 404 }
      );
    }

    const accessToken = uuidv4();

    // Create pending purchase
    const purchase = await prisma.purchase.create({
      data: {
        email,
        userId,
        recipeId,
        accessToken,
        amount: recipe.price,
        paymentStatus: "pending",
      },
    });

    // Create Mercado Pago preference
    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: recipe.id,
            title: `Receita: ${recipe.title}`,
            description: recipe.description,
            quantity: 1,
            unit_price: recipe.price,
            currency_id: "BRL",
          },
        ],
        payer: {
          email,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/pagamento/sucesso?purchase=${purchase.id}`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/pagamento/falha`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pagamento/pendente`,
        },
        auto_return: "approved",
        external_reference: purchase.id,
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
        payment_methods: {
          excluded_payment_types: [],
          installments: 1,
        },
      },
    });

    return NextResponse.json({
      checkoutUrl: preference.init_point,
      purchaseId: purchase.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
