import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MyRecipesSearch } from "@/components/my-recipes-search";

export default async function MinhasReceitas() {
  const session = await auth();

  const purchases = session?.user?.email
    ? await prisma.purchase.findMany({
        where: {
          paymentStatus: "approved",
          OR: [
            { userId: session.user.id },
            { email: session.user.email },
          ],
        },
        include: {
          recipe: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  const recipes = purchases.map((purchase) => ({
    id: purchase.recipe.id,
    title: purchase.recipe.title,
    slug: purchase.recipe.slug,
    accessToken: purchase.accessToken,
  }));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-rose-700 mb-2 text-center">
        Minhas Receitas
      </h1>
      {session?.user ? (
        <>
          <p className="text-gray-500 text-center mb-8">
            Biblioteca vinculada a {session.user.email}.
          </p>

          {recipes.length === 0 ? (
            <div className="rounded-2xl border border-rose-100 bg-white p-8 text-center text-gray-500 shadow-sm">
              <p>Voce ainda nao tem receitas desbloqueadas nesta conta.</p>
              <Link href="/" className="mt-3 inline-block text-rose-600 hover:underline">
                Explorar receitas
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recipes.map((r) => (
                <Link
                  key={r.id}
                  href={`/receita/${r.slug}?token=${r.accessToken}`}
                  className="block bg-white rounded-xl shadow-sm border border-rose-100 p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{r.title}</h3>
                      <p className="text-sm text-green-600">✅ Desbloqueada</p>
                    </div>
                    <span className="text-rose-600 font-semibold text-sm">
                      Acessar →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-gray-500 text-center mb-4">
            Entre com Google ou email para montar sua biblioteca automaticamente.
          </p>
          <div className="mb-8 text-center text-sm text-gray-500">
            <Link href="/entrar" className="text-rose-600 hover:underline">
              Entrar
            </Link>{" "}
            ou{" "}
            <Link href="/cadastro" className="text-rose-600 hover:underline">
              criar conta
            </Link>
            . Se preferir, tambem pode buscar pelo email usado na compra.
          </div>
          <MyRecipesSearch />
        </>
      )}
    </div>
  );
}
