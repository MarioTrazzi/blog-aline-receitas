export function Masthead() {
  const categories = ["Doces", "Brasileira", "Fit", "Pães"];

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ background: "var(--paper)", borderColor: "rgba(31,26,20,0.12)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-14">
        {/* nav esquerda — desktop */}
        <nav className="hidden gap-7 md:flex">
          {categories.map((c) => (
            <a
              key={c}
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
              style={{ color: "var(--ink-2)" }}
            >
              {c}
            </a>
          ))}
        </nav>

        {/* logo — centro */}
        <a href="/" className="no-underline">
          <div
            className="display text-[24px] leading-none md:text-[26px]"
            style={{ color: "var(--ink)" }}
          >
            Blog da <span className="italic-accent">Aline</span>
          </div>
        </a>

        {/* CTA direita — desktop */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#newsletter"
            className="rounded-sm px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity hover:opacity-80"
            style={{ background: "var(--terracota)", color: "var(--paper)" }}
          >
            Receita grátis
          </a>
        </div>

        {/* mobile: só o logo é exibido — hambúrguer removido por simplicidade */}
        <div className="flex md:hidden">
          <a
            href="#newsletter"
            className="rounded-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{ background: "var(--terracota)", color: "var(--paper)" }}
          >
            Grátis
          </a>
        </div>
      </div>
    </header>
  );
}
