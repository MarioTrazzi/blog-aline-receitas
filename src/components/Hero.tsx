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
    ? "Grátis"
    : `R$ ${recipe.price.toFixed(2).replace(".", ",")}`;

  return (
    <section className="px-6 py-12 md:px-14 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_480px] md:gap-14">
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <div
            className="kicker-accent mb-4 inline-flex items-center gap-2"
          >
            <span
              className="inline-block h-px w-8"
              style={{ background: "var(--terracota)" }}
            />
            Destaque da semana
          </div>

          <h2
            className="display mb-5 text-[36px] leading-[1.02] md:text-[56px]"
            style={{ textWrap: "balance" as never }}
          >
            {recipe.title}
          </h2>

          <p
            className="mb-8 max-w-[500px] text-[15px] leading-relaxed md:text-[17px]"
            style={{ color: "var(--ink-2)" }}
          >
            {recipe.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/receita/${recipe.slug}`}
              className="inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              {isFree ? "Ver receita grátis" : `Desbloquear — ${priceLabel}`}
              <span aria-hidden>→</span>
            </Link>

            {!isFree && (
              <span className="font-mono text-[11px]" style={{ color: "var(--ink-3)" }}>
                Acesso vitalício
              </span>
            )}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <RecipeImage
            src={recipe.imageUrl}
            alt={recipe.title}
            label="destaque"
            aspect="4/3"
            priority
            className="rounded-sm shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
