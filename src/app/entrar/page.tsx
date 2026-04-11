import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, hasGoogleAuth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function EntrarPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl: requestedCallbackUrl } = await searchParams;
  const callbackUrl = requestedCallbackUrl || "/minhas-receitas";

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-rose-700">Entrar</h1>
        <p className="mt-2 text-sm text-gray-500">
          Entre para salvar suas compras na sua biblioteca e acessar suas receitas de forma mais facil.
        </p>

        <div className="mt-8 space-y-4">
          {!hasGoogleAuth ? (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">
              Configure GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET para ativar o login com Google.
            </div>
          ) : null}

          <LoginForm showGoogle={hasGoogleAuth} callbackUrl={callbackUrl} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Ainda nao tem conta? <Link href="/cadastro" className="text-rose-600 hover:underline">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
