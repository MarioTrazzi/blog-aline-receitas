// src/components/RecipeCard.tsx
// Card Editorial: borda superior, número de edição,
// imagem grande, título com itálico, footer meta.

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

export function RecipeCard({
  recipe,
  index,
}: {
  recipe: Recipe;
  index: number;
}) {
  const isFree = recipe.price === 0;
  const priceLabel = isFree
    ? "GRÁTIS"
    : `R$ ${recipe.price.toFixed(2).replace(".", ",")}`;

  // Último termo do título vira itálico, pro toque editorial
  const words = recipe.title.trim().split(" ");
  const head = words.slice(0, -1).join(" ");
  const tail = words.slice(-1)[0];

  return (
    <Link
      href={`/receita/${recipe.slug}`}
      className="group block border-t border-ink/15 pt-5 transition-transform duration-300 hover:-translate-y-1"
      style={{ borderColor: "rgba(31,26,20,0.15)" }}
    >
      {/* meta row */}
      <div className="mb-3.5 flex items-baseline justify-between">
        <span className="kicker-accent">
          № {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`price-pill ${isFree ? "free" : ""}`}>{priceLabel}</span>
      </div>

      {/* image */}
      <RecipeImage
        src={recipe.imageUrl}
        alt={recipe.title}
        label={recipe.slug}
        aspect="4/5"
        className="mb-4 overflow-hidden transition-transform duration-500 group-hover:scale-[1.015]"
      />

      {/* title */}
      <h3 className="display mb-2.5 text-[22px] md:text-2xl" style={{ textWrap: "balance" as never }}>
        {head ? <>{head}{" "}</> : null}
        <span className="italic-accent text-[24px] md:text-[26px]">{tail}</span>
      </h3>

      <p
        className="mb-4 line-clamp-2 text-[13px] leading-relaxed"
        style={{ color: "var(--ink-3)" }}
      >
        {recipe.description}
      </p>

      {/* footer */}
      <div
        className="flex items-center justify-between border-t pt-3 font-mono text-[10px] uppercase tracking-[0.06em]"
        style={{ borderColor: "rgba(31,26,20,0.08)", color: "var(--ink-3)" }}
      >
        <span>{isFree ? "🔓 receita liberada" : "🔒 ver receita"}</span>
        <span
          className="font-medium group-hover:underline"
          style={{ color: "var(--terracota)" }}
        >
          Ler receita →
        </span>
      </div>
    </Link>
  );
}
