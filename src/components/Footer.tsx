// src/components/Footer.tsx
export function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-3 border-t px-6 py-9 md:px-14"
      style={{ borderColor: "rgba(31,26,20,0.15)" }}
    >
      <div className="kicker">© 2026 Blog da Aline</div>
      <div className="kicker">Feito com cuidado</div>
    </footer>
  );
}
