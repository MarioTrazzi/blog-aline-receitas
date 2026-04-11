import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN não configurado. Conecte um Vercel Blob ao projeto.",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = String(formData.get("slug") || "receita");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Nenhum arquivo de vídeo foi enviado." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "Envie um arquivo de vídeo válido." },
        { status: 400 }
      );
    }

    const safeSlug = sanitizeSegment(slug || "receita");
    const safeFileName = sanitizeSegment(file.name || "video.mp4") || "video.mp4";

    const blob = await put(
      `recipe-videos/${safeSlug}/${Date.now()}-${safeFileName}`,
      file,
      {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN.trim(),
      }
    );

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: "Erro ao enviar vídeo." },
      { status: 500 }
    );
  }
}
