export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="px-6 py-16 md:px-14 md:py-20"
      style={{ background: "var(--paper)" }}
    >
      <div className="mx-auto max-w-[600px] text-center">
        <div className="kicker-accent mb-4">Grátis · Toda terça</div>
        <h2 className="display mb-4 text-[32px] leading-tight md:text-[44px]">
          Uma receita nova{" "}
          <span className="italic-accent">direto no seu WhatsApp</span>
        </h2>
        <p
          className="mb-10 text-[15px] leading-relaxed"
          style={{ color: "var(--ink-2)" }}
        >
          Receita curta, vídeo de 3 minutos, e um motivo pra ir pra cozinha hoje.
          Sem spam, prometo.
        </p>

        <form className="flex flex-col gap-3 sm:flex-row sm:gap-0">
          <input
            type="tel"
            placeholder="(11) 98765-4321"
            className="flex-1 rounded-sm px-4 py-3.5 font-mono text-[14px] sm:rounded-r-none"
            style={{
              border: "1px solid rgba(31,26,20,0.25)",
              borderRight: "none",
              background: "var(--paper)",
              color: "var(--ink)",
              outline: "none",
            }}
          />
          <button
            type="button"
            className="cursor-pointer rounded-sm border-0 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85 sm:rounded-l-none"
            style={{
              background: "var(--terracota)",
              color: "var(--paper)",
            }}
          >
            Quero →
          </button>
        </form>
        <p className="mt-4 text-[12px]" style={{ color: "var(--ink-3)" }}>
          Cancele quando quiser. Sem compromisso.
        </p>
      </div>
    </section>
  );
}
