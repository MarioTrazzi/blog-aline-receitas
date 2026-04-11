"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function SignupForm({
  showGoogle,
  callbackUrl,
}: {
  showGoogle: boolean;
  callbackUrl: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Nao foi possivel criar sua conta.");
        return;
      }

      const signInResponse = await signIn("credentials", {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        redirect: false,
        callbackUrl,
      });

      if (signInResponse?.error) {
        router.push("/entrar");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  async function handleGoogleLogin() {
    await signIn("google", { callbackUrl });
  }

  return (
    <div className="space-y-4">
      {showGoogle ? (
        <button
          type="button"
          onClick={() => void handleGoogleLogin()}
          className="w-full rounded-full border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cadastrar com Google
        </button>
      ) : null}
      {showGoogle ? (
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-300">
          <span className="h-px flex-1 bg-gray-200" />
          ou
          <span className="h-px flex-1 bg-gray-200" />
        </div>
      ) : null}
      <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-rose-200 px-4 py-3 focus:border-rose-400 focus:outline-none"
          placeholder="Seu nome"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-rose-200 px-4 py-3 focus:border-rose-400 focus:outline-none"
          placeholder="voce@email.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-rose-200 px-4 py-3 focus:border-rose-400 focus:outline-none"
          placeholder="Crie uma senha"
        />
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-rose-600 px-6 py-3 font-bold text-white transition hover:bg-rose-700 disabled:bg-rose-300"
      >
        {pending ? "Criando conta..." : "Criar conta com email"}
      </button>
      <p className="text-center text-sm text-gray-500">
        Ja tem conta? <Link href={`/entrar?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-rose-600 hover:underline">Entrar</Link>
      </p>
      </form>
    </div>
  );
}
