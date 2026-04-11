"use client";

import { useState } from "react";
import Link from "next/link";

interface PurchasedRecipe {
  id: string;
  title: string;
  slug: string;
  accessToken: string;
}

export function MyRecipesSearch() {
  const [email, setEmail] = useState("");
  const [recipes, setRecipes] = useState<PurchasedRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!email || !email.includes("@")) {
      setError("Insira um email valido.");
      return;
    }

    setError("");
    setLoading(true);
    setSearched(false);

    try {
      const res = await fetch(`/api/minhas-receitas?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setRecipes(data.recipes || []);
      setSearched(true);
    } catch {
      setError("Erro ao buscar receitas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 border border-rose-100">
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="seu@email.com"
            className="flex-1 px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold px-6 py-3 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Buscar"}
          </button>
        </div>
        {error ? <p className="text-red-500 text-sm mt-2">{error}</p> : null}
      </div>

      {searched ? (
        <div className="mt-8">
          {recipes.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>Nenhuma receita encontrada para este email.</p>
              <Link href="/" className="text-rose-600 hover:underline mt-2 inline-block">
                Explore nossas receitas →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/receita/${recipe.slug}?token=${recipe.accessToken}`}
                  className="block bg-white rounded-xl shadow-sm border border-rose-100 p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{recipe.title}</h3>
                      <p className="text-sm text-green-600">Desbloqueada</p>
                    </div>
                    <span className="text-rose-600 font-semibold text-sm">Acessar →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
