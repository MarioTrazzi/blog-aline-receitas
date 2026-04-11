import Link from "next/link";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";

export async function AuthNav() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/entrar" className="text-gray-600 hover:text-rose-600 transition">
          Entrar
        </Link>
        <Link
          href="/cadastro"
          className="rounded-full bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700"
        >
          Criar conta
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-gray-500 sm:inline">
        Ola, {session.user.name ?? session.user.email}
      </span>
      <Link href="/minhas-receitas" className="text-gray-600 hover:text-rose-600 transition">
        Minha Biblioteca
      </Link>
      <SignOutButton />
    </div>
  );
}
