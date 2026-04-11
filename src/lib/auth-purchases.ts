import { prisma } from "@/lib/prisma";

export async function linkPurchasesToUser(userId: string, email: string) {
  await prisma.purchase.updateMany({
    where: {
      email,
      userId: null,
    },
    data: {
      userId,
    },
  });
}

export async function attachPurchaseToMatchingUser(purchaseId: string, email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return;
  }

  await prisma.purchase.update({
    where: { id: purchaseId },
    data: {
      userId: user.id,
    },
  });
}
