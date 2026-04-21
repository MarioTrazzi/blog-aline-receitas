// src/components/Newsletter.tsx
// Captura de WhatsApp — ação real deve ser conectada pela Aline (server action, API etc).

export function Newsletter() {
  return (
    <section
      className="px-6 py-20 md:px-14"
      style={{
        background: "var(--paper-2)",
        borderTop: "2px solid var(--ink)",
      }}
    >
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <div className="kicker-accent mb-3">Carta semanal · Grátis</div>
          <h2 className="display mb-5 text-[36px] leading-none md:text-[48px]">
            Uma receita grátis{" "}
            <span className="italic-accent text-[1.1em]">toda terça</span>, no seu WhatsApp.
          </h2>
          <p
            className="max-w-[440px] text-[15px] leading-relaxed"
            style={{ color: "var(--ink-2)" }}
          >
            Receita curta, vídeo de 3 minutos, e o motivo pra você ir pra cozinha hoje. Sem spam, prometo.
          </p>
        </div>

        <form
          className="p-6"
          style={{
            background: "var(--paper)",
            border: "1px solid var(--ink)",
          }}
        >
          <label className="kicker mb-2.5 block">Seu WhatsApp</label>
          <input
            type="tel"
            placeholder="(11) 98765-4321"
            className="mb-3.5 w-full rounded-sm bg-transparent px-3.5 py-3 font-mono text-[14px]"
            style={{
              border: "1px solid rgba(31,26,20,0.25)",
              color: "var(--ink)",
            }}
          />
          <button
            type="button"
            className="w-full cursor-pointer rounded-sm border-0 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em]"
            style={{
              background: "var(--terracota)",
              color: "var(--paper)",
            }}
          >
            Quero a receita grátis →
          </button>
        </form>
      </div>
    </section>
  );
}
