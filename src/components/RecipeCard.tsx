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

export function RecipeCard({ recipe }: { recipe: Recipe; index: number }) {
  const isFree = recipe.price === 0;
  const priceLabel = isFree
    ? "Grátis"
    : `R$ ${recipe.price.toFixed(2).replace(".", ",")}`;

  return (
    <Link
      href={`/receita/${recipe.slug}`}
      className="group block transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative mb-4 overflow-hidden rounded-sm">
        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.title}
          label={recipe.slug}
          aspect="4/3"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute right-3 top-3">
          <span
            className={`price-pill ${isFree ? "free" : ""}`}
          >
            {priceLabel}
          </span>
        </div>
      </div>

      <h3
        className="display mb-2 text-[20px] leading-snug md:text-[22px]"
        style={{ textWrap: "balance" as never }}
      >
        {recipe.title}
      </h3>

      <p
        className="mb-3 line-clamp-2 text-[13px] leading-relaxed"
        style={{ color: "var(--ink-3)" }}
      >
        {recipe.description}
      </p>

      <span
        className="font-mono text-[11px] uppercase tracking-[0.08em] transition-colors group-hover:underline"
        style={{ color: "var(--terracota)" }}
      >
        {isFree ? "Acessar receita →" : "Ver receita →"}
      </span>
    </Link>
  );
}
