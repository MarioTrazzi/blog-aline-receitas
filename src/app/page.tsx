// src/app/page.tsx
// Home do Blog da Aline — estrutura editorial gourmet.

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
    <main>
      <Masthead />

      <div style={{ borderBottom: "1px solid rgba(31,26,20,0.12)" }} />

      {featured ? (
        <Hero recipe={featured} />
      ) : (
        <section className="px-6 py-24 text-center md:px-14">
          <p className="kicker mb-4">Em breve</p>
          <h2 className="display text-[36px] md:text-[48px]">
            Nenhuma receita publicada <span className="italic-accent">ainda</span>.
          </h2>
          <p className="mt-4" style={{ color: "var(--ink-3)" }}>
            Volte em breve — estamos testando a próxima receita na cozinha.
          </p>
        </section>
      )}

      {popular.length > 0 && (
        <section className="px-6 py-20 md:px-14">
          <div
            className="mb-12 flex items-baseline justify-between border-b pb-4"
            style={{ borderColor: "rgba(31,26,20,0.15)" }}
          >
            <div>
              <div className="kicker-accent mb-2">Mais cozinhadas da semana</div>
              <h2 className="display text-[32px] md:text-[44px]">
                As favoritas <span className="italic-accent text-[1.1em]">da casa</span>
              </h2>
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {popular.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      <Features />

      <Testimonials />

      {rest.length > 0 && (
        <section className="px-6 py-20 md:px-14">
          <div
            className="mb-12 flex items-baseline justify-between border-b pb-4"
            style={{ borderColor: "rgba(31,26,20,0.15)" }}
          >
            <div>
              <div className="kicker-accent mb-2">Catálogo completo</div>
              <h2 className="display text-[32px] md:text-[44px]">
                Todas as <span className="italic-accent text-[1.1em]">receitas</span>
              </h2>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
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
