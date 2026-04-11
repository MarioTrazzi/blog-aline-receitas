import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, hasGoogleAuth } from "@/auth";
import { SignupForm } from "@/components/auth/signup-form";

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function CadastroPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl: requestedCallbackUrl } = await searchParams;
  const callbackUrl = requestedCallbackUrl || "/minhas-receitas";

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-rose-700">Criar conta</h1>
        <p className="mt-2 text-sm text-gray-500">
          Crie sua conta para centralizar compras e formar a biblioteca das suas receitas desbloqueadas.
        </p>

        <div className="mt-8 space-y-4">
          {!hasGoogleAuth ? (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">
              Configure GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET para ativar o cadastro com Google.
            </div>
          ) : null}

          <SignupForm showGoogle={hasGoogleAuth} callbackUrl={callbackUrl} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Ja tem conta? <Link href="/entrar" className="text-rose-600 hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}