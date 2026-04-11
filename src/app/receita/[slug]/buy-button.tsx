"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface BuyButtonProps {
  recipeId: string;
  isAuthenticated: boolean;
  loginUrl: string;
  autoStartCheckout?: boolean;
}

export function BuyButton({
  recipeId,
  isAuthenticated,
  loginUrl,
  autoStartCheckout = false,
}: BuyButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasAutoStarted = useRef(false);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push(loginUrl);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
      });

      const data = await response.json();

      if (data.accessUrl) {
        window.location.href = data.accessUrl;
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError("Erro ao processar pagamento. Tente novamente.");
      }
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoStartCheckout && isAuthenticated && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      void handlePurchase();
    }
  }, [autoStartCheckout, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => router.push(loginUrl)}
        className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer"
      >
        🔓 Entrar para Desbloquear
      </button>
    );
  }

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="rounded-2xl bg-rose-50 p-4 text-sm text-gray-600">
        Ao continuar, a compra sera vinculada automaticamente a sua conta e a receita vai entrar na sua biblioteca.
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold py-3 px-6 rounded-full transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Processando..." : "Pagar com Mercado Pago 💳"}
      </button>
    </div>
  );
}
