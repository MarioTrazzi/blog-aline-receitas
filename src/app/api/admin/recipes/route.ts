import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthorized } from "@/lib/admin-auth";

// GET - List all recipes
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ recipes });
}

// POST - Create a recipe
export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { title, slug, description, imageUrl, videoUrl, price, ingredients, preparation, active } = body;

    if (!title || !slug || !price) {
      return NextResponse.json(
        { error: "Campos obrigatórios: title, slug, price" },
        { status: 400 }
      );
    }

    // Validate slug uniqueness
    const existing = await prisma.recipe.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Já existe uma receita com este slug" },
        { status: 409 }
      );
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug,
        description: description || "",
        imageUrl: imageUrl || "",
        videoUrl: videoUrl || "",
        price: Number(price),
        ingredients: ingredients || "[]",
        preparation: preparation || "[]",
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Erro ao criar receita" },
      { status: 500 }
    );
  }
}
