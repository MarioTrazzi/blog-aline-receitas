import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  const email = request.nextUrl.searchParams.get("email") ?? session?.user?.email;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const purchases = await prisma.purchase.findMany({
    where: {
      paymentStatus: "approved",
      OR: [
        { email },
        session?.user?.id ? { userId: session.user.id } : { id: "" },
      ],
    },
    include: {
      recipe: true,
    },
  });

  const recipes = purchases.map((p) => ({
    id: p.recipe.id,
    title: p.recipe.title,
    slug: p.recipe.slug,
    accessToken: p.accessToken,
  }));

  return NextResponse.json({ recipes });
}
