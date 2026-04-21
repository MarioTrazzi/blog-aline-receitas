// src/app/receita/[slug]/page.tsx
// Página da receita individual.
// Mantém compatibilidade com os campos atuais do Prisma (title, description, imageUrl, price, slug).
// Paywall simulado: receitas pagas mostram bloqueio; gratuitas mostram conteúdo real.

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RecipeImage } from "@/components/RecipeImage";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { slug } });
  if (!recipe) return { title: "Receita não encontrada" };
  return {
    title: `${recipe.title} — Blog da Aline`,
    description: recipe.description,
  };
}

export default async function ReceitaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { slug } });
  if (!recipe || !recipe.active) notFound();

  const isFree = recipe.price === 0;
  const priceLabel = isFree
    ? "Grátis"
    : `R$ ${recipe.price.toFixed(2).replace(".", ",")}`;

  const words = recipe.title.trim().split(" ");
  const head = words.slice(0, -1).join(" ");
  const tail = words.slice(-1)[0];

  return (
    <main>
      {/* top bar */}
      <div
        className="flex items-center justify-between border-b px-6 py-5 md:px-14"
        style={{ borderColor: "rgba(31,26,20,0.15)" }}
      >
        <Link href="/" className="kicker no-underline" style={{ color: "var(--ink)" }}>
          ← Voltar ao início
        </Link>
        <div
          className="italic"
          style={{ fontFamily: "var(--serif-italic)", fontSize: 22 }}
        >
          Blog da Aline
        </div>
        <span className="kicker">Receita</span>
      </div>

      {/* hero da receita */}
      <article className="px-6 py-14 md:px-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
          <RecipeImage
            src={recipe.imageUrl}
            alt={recipe.title}
            label={recipe.slug}
            aspect="4/5"
            priority
          />

          <div className="flex flex-col">
            <div className="kicker-accent mb-4">Receita exclusiva</div>
            <h1
              className="display mb-6 text-[44px] leading-[0.98] md:text-[72px]"
              style={{ textWrap: "balance" as never }}
            >
              {head}{" "}
              <span className="italic-accent text-[1.08em]">{tail}</span>
            </h1>
            <p
              className="mb-8 text-[16px] leading-relaxed md:text-[18px]"
              style={{ color: "var(--ink-2)" }}
            >
              {recipe.description}
            </p>

            {/* price / CTA */}
            <div
              className="mb-8 flex items-center gap-4 border-t border-b py-5"
              style={{ borderColor: "rgba(31,26,20,0.15)" }}
            >
              <div>
                <div className="kicker mb-1">Preço</div>
                <div className="display text-[32px]">{priceLabel}</div>
              </div>
              <div className="flex-1" />
              {isFree ? (
                <a
                  href="#conteudo"
                  className="inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] no-underline"
                  style={{
                    background: "var(--oliva)",
                    color: "var(--paper)",
                  }}
                >
                  Acessar receita →
                </a>
              ) : (
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-sm border-0 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em]"
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                  }}
                >
                  Desbloquear por {priceLabel} →
                </button>
              )}
            </div>

            {/* features preview */}
            <div
              className="grid grid-cols-2 gap-4 border-t pt-5"
              style={{ borderColor: "rgba(31,26,20,0.08)" }}
            >
              {[
                ["▶", "Vídeo em HD"],
                ["☰", "Lista de mercado"],
                ["✎", "Passo a passo"],
                ["❤", "Comunidade"],
              ].map(([i, t]) => (
                <div key={t} className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 24,
                      color: "var(--terracota)",
                      lineHeight: 1,
                    }}
                  >
                    {i}
                  </span>
                  <span className="text-[14px]" style={{ color: "var(--ink-2)" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* conteúdo — se gratuito, mostra placeholder; se pago, mostra bloqueio */}
      <section
        id="conteudo"
        className="border-t px-6 py-16 md:px-14 md:py-20"
        style={{
          borderColor: "rgba(31,26,20,0.15)",
          background: "var(--paper-2)",
        }}
      >
        {isFree ? (
          <div className="mx-auto max-w-[760px]">
            <div className="kicker-accent mb-3">Modo de preparo</div>
            <h2 className="display mb-8 text-[32px] md:text-[44px]">
              Vamos pra <span className="italic-accent text-[1.1em]">cozinha</span>
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Conteúdo da receita (ingredientes, passo a passo, vídeo) entra aqui,
              vindo do seu banco. Esta é a área liberada quando a receita é gratuita
              ou o pagamento já foi confirmado.
            </p>
          </div>
        ) : (
          <div
            className="mx-auto max-w-[680px] text-center"
            style={{ color: "var(--ink-2)" }}
          >
            <div className="mb-4 text-[48px]" style={{ color: "var(--terracota)" }}>
              🔒
            </div>
            <h2 className="display mb-4 text-[32px] md:text-[40px]">
              Receita <span className="italic-accent text-[1.1em]">bloqueada</span>
            </h2>
            <p
              className="mx-auto mb-8 max-w-[480px] text-[16px] leading-relaxed"
              style={{ color: "var(--ink-3)" }}
            >
              Ingredientes, passo a passo, vídeo em HD, lista de mercado e acesso à
              comunidade liberados após o pagamento de {priceLabel}.
            </p>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-sm border-0 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.14em]"
              style={{
                background: "var(--terracota)",
                color: "var(--paper)",
              }}
            >
              Desbloquear por {priceLabel} →
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
