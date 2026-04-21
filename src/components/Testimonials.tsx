const ITEMS = [
  {
    name: "Mariana S.",
    city: "São Paulo",
    text: "Fiz o pão de fermentação natural e meu marido disse que é melhor que padaria. Os vídeos são MUITO detalhados.",
  },
  {
    name: "Camila R.",
    city: "Belo Horizonte",
    text: "A Aline explica cada passo como se estivesse ao lado. Já comprei 5 receitas e não me arrependo de nenhuma.",
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
      className="px-6 py-16 md:px-14 md:py-20"
      style={{
        background: "var(--paper-2)",
        borderTop: "1px solid rgba(31,26,20,0.1)",
        borderBottom: "1px solid rgba(31,26,20,0.1)",
      }}
    >
      <div className="mb-12 text-center">
        <div className="kicker-accent mb-3">Quem já experimentou</div>
        <h2 className="display text-[32px] md:text-[44px]">
          Receitas que viram{" "}
          <span className="italic-accent">histórias reais</span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            className="m-0 rounded-sm p-7"
            style={{
              background: "var(--paper)",
              border: "1px solid rgba(31,26,20,0.1)",
            }}
          >
            <div className="mb-4 text-[28px]" style={{ color: "var(--terracota)", fontFamily: "var(--serif)" }}>
              "
            </div>
            <blockquote
              className="m-0 mb-6 leading-relaxed"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "17px",
                color: "var(--ink-2)",
              }}
            >
              {t.text}
            </blockquote>
            <figcaption className="kicker" style={{ color: "var(--ink-3)" }}>
              {t.name} · {t.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
