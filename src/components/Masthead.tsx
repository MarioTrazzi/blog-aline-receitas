// src/components/Masthead.tsx
export function Masthead() {
  return (
    <>
      <header
        className="flex items-center justify-between border-b px-6 py-5 md:px-14"
        style={{ borderColor: "rgba(31,26,20,0.15)" }}
      >
        <div className="kicker">Edição 04 · Abril 2026</div>
        <nav className="hidden gap-6 font-mono text-[11px] uppercase tracking-[0.12em] md:flex">
          {["Doces", "Brasileira", "Fit", "Pães"].map((c) => (
            <a key={c} href="#" style={{ color: "var(--ink)" }} className="no-underline">
              {c}
            </a>
          ))}
        </nav>
        <div className="kicker">№ 04</div>
      </header>

      <div
        className="px-6 py-12 text-center md:px-14"
        style={{ borderBottom: "2px solid var(--ink)" }}
      >
        <div className="kicker-accent mb-3">
          Receitas exclusivas · Cozinhadas com cuidado
        </div>
        <h1 className="display text-[64px] md:text-[104px]" style={{ fontWeight: 300 }}>
          Blog da{" "}
          <span className="italic-accent" style={{ fontSize: "1.04em", fontWeight: 400 }}>
            Aline
          </span>
        </h1>
        <div className="kicker mt-3">
          Comida brasileira · Fit · Pães &amp; massas
        </div>
      </div>
    </>
  );
}
