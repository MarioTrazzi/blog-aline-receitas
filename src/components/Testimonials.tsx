// src/components/Testimonials.tsx
// Depoimentos como cartas, com borda terracota à esquerda.

const ITEMS = [
  {
    name: "Mariana S.",
    city: "São Paulo",
    text: "Fiz o pão de fermentação natural e meu marido disse que é melhor que padaria. Os vídeos são MUITO detalhados.",
  },
  {
    name: "Camila R.",
    city: "Belo Horizonte",
    text: "A Aline explica cada passo como se estivesse ao lado. Já comprei 5 receitas e não me arrependo.",
  },
  {
    name: "Juliana P.",
    city: "Curitiba",
    text: "Comecei a cozinhar do zero com as receitas fit. Emagreci 6kg sem passar fome — e comendo delicioso.",
  },
];

export function Testimonials() {
  return (
    <section
      className="border-b px-6 py-20 md:px-14"
      style={{ borderColor: "rgba(31,26,20,0.15)" }}
    >
      <div className="kicker-accent mb-3 text-center">Cartas de cozinheiras reais</div>
      <h2 className="display mb-14 text-center text-[36px] md:text-[48px]">
        Quem <span className="italic-accent text-[1.1em]">já experimentou</span>
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            className="m-0 pl-5.5"
            style={{
              borderLeft: "2px solid var(--terracota)",
              paddingLeft: "22px",
            }}
          >
            <blockquote
              className="m-0 mb-5 italic leading-snug"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "19px",
                color: "var(--ink-2)",
              }}
            >
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <figcaption className="kicker" style={{ color: "var(--ink-2)" }}>
              {t.name} — {t.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
