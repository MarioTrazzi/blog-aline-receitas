import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { linkPurchasesToUser } from "@/lib/auth-purchases";

const signupSchema = z.object({
  name: z.string().min(2, "Informe seu nome.").trim(),
  email: z.email("Informe um email valido.").trim(),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados invalidos." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: existingUser.passwordHash
            ? "Ja existe uma conta com este email. Faça login."
            : "Ja existe uma conta social com este email. Entre com Google.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await hash(parsed.data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
      },
    });

    await linkPurchasesToUser(user.id, user.email);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Nao foi possivel criar sua conta." },
      { status: 500 }
    );
  }
}