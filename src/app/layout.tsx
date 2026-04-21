// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog da Aline — Receitas Exclusivas",
  description:
    "Receitas testadas mil vezes, contadas em detalhe. Passo a passo em vídeo, lista de mercado e o truque que sua vó sabia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="paper-bg antialiased">{children}</body>
    </html>
  );
}
