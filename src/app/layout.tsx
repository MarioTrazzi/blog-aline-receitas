import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { AuthNav } from "@/components/auth/auth-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Receitas da Aline | Receitas Exclusivas",
  description:
    "Biblioteca de receitas exclusivas com vídeos detalhados, ingredientes e modo de preparo passo a passo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-rose-50 text-gray-800">
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-rose-600">
              🍰 Receitas da Aline
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/"
                className="text-gray-600 hover:text-rose-600 transition"
              >
                Receitas
              </Link>
              <Link
                href="/minhas-receitas"
                className="text-gray-600 hover:text-rose-600 transition"
              >
                Minhas Receitas
              </Link>
              <AuthNav />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-rose-100 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>© 2026 Receitas da Aline. Todos os direitos reservados.</p>
            <p className="mt-1">
              Siga no Instagram para mais receitas! 📱
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
