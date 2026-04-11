import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const recipes = await prisma.recipe.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-rose-700 mb-3">
          Receitas Exclusivas
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Desbloqueie receitas completas com vídeos detalhados, lista de
          ingredientes e modo de preparo passo a passo. 🍳
        </p>
      </section>

      {/* Grid de Receitas */}
      {recipes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">Nenhuma receita disponível ainda.</p>
          <p className="mt-2">Volte em breve! 🍰</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/receita/${recipe.slug}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-rose-100"
            >
              <div className="relative w-full h-56">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-rose-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                  R$ {recipe.price.toFixed(2).replace(".", ",")}
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-rose-600 transition">
                  {recipe.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    🔒 Receita bloqueada
                  </span>
                  <span className="text-rose-600 text-sm font-semibold group-hover:underline">
                    Ver receita →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
