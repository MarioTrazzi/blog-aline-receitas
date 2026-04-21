export function Footer() {
  return (
    <footer
      className="border-t px-6 py-10 md:px-14"
      style={{ borderColor: "rgba(31,26,20,0.12)" }}
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <div className="display text-[20px]" style={{ color: "var(--ink)" }}>
            Blog da <span className="italic-accent">Aline</span>
          </div>
          <div className="kicker mt-1" style={{ color: "var(--ink-3)" }}>
            Receitas exclusivas desde 2024
          </div>
        </div>

        <nav className="flex gap-6">
          {["Doces", "Fit", "Pães", "Brasileira"].map((c) => (
            <a
              key={c}
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:underline"
              style={{ color: "var(--ink-3)" }}
            >
              {c}
            </a>
          ))}
        </nav>

        <div className="kicker" style={{ color: "var(--ink-3)" }}>
          © 2026 · Feito com cuidado
        </div>
      </div>
    </footer>
  );
}
