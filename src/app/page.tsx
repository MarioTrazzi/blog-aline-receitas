import { prisma } from "@/lib/prisma";
import { Masthead } from "@/components/Masthead";
import { Hero } from "@/components/Hero";
import { RecipeCard } from "@/components/RecipeCard";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const recipes = await prisma.recipe.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  const featured = recipes[0] ?? null;
  const popular = recipes.slice(1, 4);
  const rest = recipes.slice(4);

  return (
    <main className="mx-auto max-w-[1200px]">
      <Masthead />

      {featured ? (
        <div className="px-0 md:px-6 md:pt-6 lg:px-10">
          <Hero recipe={featured} />
        </div>
      ) : (
        <section className="px-6 py-24 text-center md:px-14">
          <p className="kicker mb-4">Em breve</p>
          <h2 className="display text-[32px] md:text-[44px]">
            Nenhuma receita publicada <span className="italic-accent">ainda</span>.
          </h2>
          <p className="mt-4 text-[15px]" style={{ color: "var(--ink-3)" }}>
            Volte em breve — estamos testando a próxima receita na cozinha.
          </p>
        </section>
      )}

      {popular.length > 0 && (
        <section className="px-6 py-14 md:px-10 md:py-16">
          <div
            className="mb-8 border-b pb-4"
            style={{ borderColor: "rgba(31,26,20,0.12)" }}
          >
            <div className="kicker-accent mb-1">Mais cozinhadas</div>
            <h2 className="display text-[26px] md:text-[36px]">
              As favoritas <span className="italic-accent">da casa</span>
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {popular.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      <Features />

      <Testimonials />

      {rest.length > 0 && (
        <section className="px-6 py-14 md:px-10 md:py-16">
          <div
            className="mb-8 border-b pb-4"
            style={{ borderColor: "rgba(31,26,20,0.12)" }}
          >
            <div className="kicker-accent mb-1">Catálogo completo</div>
            <h2 className="display text-[26px] md:text-[36px]">
              Todas as <span className="italic-accent">receitas</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {rest.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i + 4} />
            ))}
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </main>
  );
}
