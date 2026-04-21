export function Masthead() {
  const categories = ["Doces", "Brasileira", "Fit", "Pães & Massas"];

  return (
    <header>
      <div
        className="flex items-center justify-between border-b px-6 py-4 md:px-14"
        style={{ borderColor: "rgba(31,26,20,0.12)" }}
      >
        <nav className="hidden gap-7 md:flex">
          {categories.map((c) => (
            <a
              key={c}
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
              style={{ color: "var(--ink-3)" }}
            >
              {c}
            </a>
          ))}
        </nav>

        <a href="/" className="text-center no-underline">
          <div className="display text-[28px] leading-none md:text-[32px]" style={{ color: "var(--ink)" }}>
            Blog da <span className="italic-accent">Aline</span>
          </div>
          <div className="kicker mt-1" style={{ color: "var(--ink-3)" }}>
            Receitas exclusivas
          </div>
        </a>

        <div className="hidden md:block">
          <a
            href="#newsletter"
            className="rounded-sm px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity hover:opacity-80"
            style={{ background: "var(--terracota)", color: "var(--paper)" }}
          >
            Receita grátis →
          </a>
        </div>

        <div className="block md:hidden">
          <svg width="20" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 1h20M0 7h20M0 13h20" />
          </svg>
        </div>
      </div>
    </header>
  );
}
