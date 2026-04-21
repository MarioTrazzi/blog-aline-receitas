// src/components/Features.tsx
// Seção escura "o que você recebe" — 4 itens numerados.

export function Features() {
  const items = [
    ["01", "Vídeos em HD", "Cada etapa filmada em detalhe. Você vê o ponto certo, não adivinha."],
    ["02", "Lista de mercado", "Quantidades exatas, com substituições pra quem não acha um ingrediente."],
    ["03", "Passo a passo escrito", "Pra imprimir, pra levar pra cozinha, pra nunca mais esquecer."],
    ["04", "Comunidade no WhatsApp", "Dúvidas respondidas por mim. Fotos das alunas. Receitas bônus."],
  ];

  return (
    <section
      className="px-6 py-16 md:px-14 md:py-20"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <div className="max-w-[900px]">
        <div className="kicker-accent mb-3">O que você recebe</div>
        <h2
          className="display mb-10 text-[36px] leading-none md:mb-12 md:text-[56px]"
          style={{ color: "var(--paper)" }}
        >
          Não é só uma receita. É a{" "}
          <span
            className="italic-accent text-[1.1em]"
            style={{ color: "var(--mostarda)" }}
          >
            minha cozinha
          </span>{" "}
          inteira.
        </h2>
      </div>

      <div
        className="grid gap-7 border-t pt-9 md:grid-cols-4"
        style={{ borderColor: "rgba(245,240,230,0.18)" }}
      >
        {items.map(([n, t, d]) => (
          <div key={n}>
            <div
              className="mb-3 text-[40px] leading-none"
              style={{ fontFamily: "var(--serif)", color: "var(--mostarda)" }}
            >
              {n}
            </div>
            <div
              className="mb-2 text-[19px]"
              style={{ fontFamily: "var(--serif)" }}
            >
              {t}
            </div>
            <div
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(245,240,230,0.7)" }}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
