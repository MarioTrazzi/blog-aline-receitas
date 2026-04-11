import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "./buy-button";

function isDirectVideoFile(url: string) {
  return /(\.mp4|\.webm|\.ogg)(\?|$)/i.test(url) ||
    url.includes("blob.vercel-storage.com");
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string; checkout?: string }>;
}

export default async function RecipePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { token, checkout } = await searchParams;
  const session = await auth();

  const recipe = await prisma.recipe.findUnique({
    where: { slug },
  });

  if (!recipe) {
    notFound();
  }

  const isFreeRecipe = recipe.price === 0;

  // Check if user has access via token
  let hasAccess = isFreeRecipe;
  if (token) {
    const purchase = await prisma.purchase.findFirst({
      where: {
        accessToken: token,
        recipeId: recipe.id,
        paymentStatus: "approved",
      },
    });
    hasAccess = !!purchase;
  }

  if (!hasAccess && session?.user?.email) {
    const purchase = await prisma.purchase.findFirst({
      where: {
        recipeId: recipe.id,
        paymentStatus: "approved",
        OR: [
          { userId: session.user.id },
          { email: session.user.email },
        ],
      },
    });

    hasAccess = Boolean(purchase);
  }

  const ingredients: string[] = JSON.parse(recipe.ingredients);
  const preparation: string[] = JSON.parse(recipe.preparation);
  const autoStartCheckout =
    checkout === "1" && Boolean(session?.user) && !hasAccess && !isFreeRecipe;
  const loginUrl = `/entrar?callbackUrl=${encodeURIComponent(`/receita/${recipe.slug}?checkout=1`)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-rose-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Voltar para receitas
      </Link>

      {/* Header da Receita */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-rose-100">
        <div className="relative w-full h-72 sm:h-96">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          {!hasAccess && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-5xl mb-3">🔒</p>
                <p className="text-xl font-bold">Receita Bloqueada</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {recipe.title}
          </h1>
          <p className="text-gray-500 text-lg mb-6">{recipe.description}</p>
          {isFreeRecipe ? (
            <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Receita gratuita liberada para degustacao
            </div>
          ) : null}

          {hasAccess ? (
            /* Conteúdo Desbloqueado */
            <div>
              {/* Vídeo */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-rose-700 mb-4">
                  📹 Vídeo Completo
                </h2>
                {recipe.videoUrl ? (
                  isDirectVideoFile(recipe.videoUrl) ? (
                    <video
                      src={recipe.videoUrl}
                      controls
                      playsInline
                      className="w-full rounded-xl bg-black"
                    />
                  ) : (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                      <iframe
                        src={recipe.videoUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`Vídeo: ${recipe.title}`}
                      />
                    </div>
                  )
                ) : (
                  <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50 p-6 text-sm text-gray-600">
                    Video completo ainda nao foi cadastrado para esta receita.
                  </div>
                )}
              </section>

              {/* Ingredientes */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-rose-700 mb-4">
                  🧾 Ingredientes
                </h2>
                <ul className="space-y-2">
                  {ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-rose-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Modo de Preparo */}
              <section>
                <h2 className="text-xl font-bold text-rose-700 mb-4">
                  👩‍🍳 Modo de Preparo
                </h2>
                <ol className="space-y-4">
                  {preparation.map((step, i) => (
                    <li key={i} className="flex gap-4 text-gray-700">
                      <span className="flex-shrink-0 w-8 h-8 bg-rose-100 text-rose-600 font-bold rounded-full flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          ) : (
            /* Conteúdo Bloqueado - Botão de Compra */
            <div className="text-center py-8 border-t border-rose-100">
              <p className="text-gray-500 mb-2">
                Desbloqueie esta receita completa com vídeo detalhado,
                ingredientes e modo de preparo.
              </p>
              <p className="text-3xl font-bold text-rose-600 mb-6">
                R$ {recipe.price.toFixed(2).replace(".", ",")}
              </p>
              <BuyButton
                recipeId={recipe.id}
                isAuthenticated={Boolean(session?.user)}
                loginUrl={loginUrl}
                autoStartCheckout={autoStartCheckout}
              />
              <p className="text-xs text-gray-400 mt-4">
                Pagamento seguro via Mercado Pago • PIX ou Cartão
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
