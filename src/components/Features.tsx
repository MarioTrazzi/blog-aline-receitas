export function Features() {
  const items = [
    {
      icon: "▶",
      title: "Vídeos em HD",
      desc: "Cada etapa filmada em detalhe. Você vê o ponto certo, não adivinha.",
    },
    {
      icon: "✓",
      title: "Lista de mercado",
      desc: "Quantidades exatas, com substituições pra quem não acha um ingrediente.",
    },
    {
      icon: "◻",
      title: "Passo a passo escrito",
      desc: "Pra imprimir, pra levar pra cozinha, pra nunca mais esquecer.",
    },
    {
      icon: "◎",
      title: "Comunidade no WhatsApp",
      desc: "Dúvidas respondidas por mim. Fotos das alunas. Receitas bônus.",
    },
  ];

  return (
    <section
      className="px-6 py-16 md:px-14 md:py-20"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <div className="mb-12 max-w-[640px]">
        <div className="kicker-accent mb-4">O que você recebe</div>
        <h2
          className="display text-[32px] leading-tight md:text-[48px]"
          style={{ color: "var(--paper)" }}
        >
          Não é só uma receita.{" "}
          <span className="italic-accent" style={{ color: "var(--mostarda)" }}>
            É minha cozinha inteira.
          </span>
        </h2>
      </div>

      <div
        className="grid gap-8 border-t pt-10 md:grid-cols-4"
        style={{ borderColor: "rgba(245,240,230,0.15)" }}
      >
        {items.map((item) => (
          <div key={item.title}>
            <div
              className="mb-4 text-[22px]"
              style={{ color: "var(--mostarda)" }}
            >
              {item.icon}
            </div>
            <h3
              className="mb-2 text-[17px] font-medium"
              style={{ fontFamily: "var(--serif)", color: "var(--paper)" }}
            >
              {item.title}
            </h3>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(245,240,230,0.65)" }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
