import { auth } from "@/auth";
import { attachPurchaseToMatchingUser } from "@/lib/auth-purchases";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ purchase?: string; external_reference?: string }>;
}

export default async function PaymentSuccess({ searchParams }: Props) {
  const { purchase: purchaseIdFromQuery, external_reference: externalReference } = await searchParams;
  const session = await auth();
  const purchaseId = purchaseIdFromQuery || externalReference;

  let accessUrl: string | null = null;

  if (purchaseId) {
    // Mark as approved (webhook may also do this, but let's ensure)
    const purchaseRecord = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: { recipe: true },
    });

    if (purchaseRecord) {
      if (session?.user?.id && purchaseRecord.userId !== session.user.id) {
        await prisma.purchase.update({
          where: { id: purchaseId },
          data: { userId: session.user.id },
        });
      } else {
        await attachPurchaseToMatchingUser(purchaseId, purchaseRecord.email);
      }

      // If not yet approved by webhook, approve it (auto_return means user came back)
      if (purchaseRecord.paymentStatus === "pending") {
        await prisma.purchase.update({
          where: { id: purchaseId },
          data: { paymentStatus: "approved" },
        });
      }
      accessUrl = `/receita/${purchaseRecord.recipe.slug}?token=${purchaseRecord.accessToken}`;
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-rose-100">
        <p className="text-6xl mb-4">✅</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pagamento Aprovado!
        </h1>
        <p className="text-gray-500 mb-6">
          Sua receita foi desbloqueada com sucesso. Aproveite!
        </p>
        {session?.user ? (
          <p className="mb-6 text-sm text-green-700">
            Esta compra foi vinculada a sua conta e ja aparece na sua biblioteca.
          </p>
        ) : null}
        {accessUrl ? (
          <Link
            href={accessUrl}
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full transition"
          >
            📖 Ver Minha Receita
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full transition"
          >
            Voltar para Receitas
          </Link>
        )}
        <p className="text-xs text-gray-400 mt-4">
          Guarde o link de acesso — ele é seu passe para a receita!
        </p>
      </div>
    </div>
  );
}
