// src/components/Hero.tsx
// Receita da semana em destaque. Se não houver receitas, renderiza null.

import Link from "next/link";
import { RecipeImage } from "./RecipeImage";

type Recipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

export function Hero({ recipe }: { recipe: Recipe | null }) {
  if (!recipe) return null;
  const isFree = recipe.price === 0;
  const priceLabel = isFree
    ? "GRÁTIS"
    : `R$ ${recipe.price.toFixed(2).replace(".", ",")}`;

  const words = recipe.title.trim().split(" ");
  const head = words.slice(0, -1).join(" ");
  const tail = words.slice(-1)[0];

  return (
    <section
      className="border-b px-6 py-14 md:px-14 md:py-20"
      style={{ borderColor: "rgba(31,26,20,0.15)" }}
    >
      <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-12">
        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.title}
          label="hero"
          aspect="4/5"
          priority
        />

        <div className="flex flex-col justify-between pt-3">
          <div>
            <div
              className="mb-6 inline-block pb-1.5 font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{
                color: "var(--terracota)",
                borderBottom: "1px solid var(--terracota)",
              }}
            >
              Receita da semana · Destaque da edição
            </div>

            <h2
              className="display mb-6 text-[40px] leading-[0.98] md:text-[68px]"
              style={{ textWrap: "balance" as never }}
            >
              {head}{" "}
              <span className="italic-accent text-[1.08em]">{tail}</span>
            </h2>

            <p
              className="mb-7 max-w-[480px] text-[15px] leading-relaxed md:text-[17px]"
              style={{ color: "var(--ink-2)" }}
            >
              {recipe.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/receita/${recipe.slug}`}
              className="inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em]"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              {isFree ? "Acessar receita" : `Desbloquear por ${priceLabel}`}
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
