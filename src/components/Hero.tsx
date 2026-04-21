import Link from "next/link";
import Image from "next/image";

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
  const priceLabel = isFree ? "Grátis" : `R$ ${recipe.price.toFixed(2).replace(".", ",")}`;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(380px, 55vw, 560px)" }}>
      {recipe.imageUrl ? (
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="ph-food h-full w-full" data-label={recipe.slug} />
      )}

      {/* gradiente de baixo pra cima */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,15,10,0.88) 0%, rgba(20,15,10,0.45) 45%, rgba(20,15,10,0.08) 100%)",
        }}
      />

      {/* conteúdo sobre a imagem */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-14 md:pb-12">
        <div
          className="kicker-accent mb-3"
          style={{ color: "var(--mostarda)" }}
        >
          Destaque da semana
        </div>

        <h2
          className="display mb-3 text-[28px] leading-tight md:text-[48px]"
          style={{ color: "#fdfaf3", textWrap: "balance" as never, maxWidth: "680px" }}
        >
          {recipe.title}
        </h2>

        <p
          className="mb-6 max-w-[520px] text-[14px] leading-relaxed md:text-[16px]"
          style={{ color: "rgba(253,250,243,0.78)" }}
        >
          {recipe.description}
        </p>

        <Link
          href={`/receita/${recipe.slug}`}
          className="inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85"
          style={{ background: "var(--terracota)", color: "#fdfaf3" }}
        >
          {isFree ? "Ver receita grátis" : `Desbloquear — ${priceLabel}`}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
