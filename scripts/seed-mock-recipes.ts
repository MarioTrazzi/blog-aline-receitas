import "dotenv/config";

import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import OpenAI from "openai";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

type MockRecipe = {
  title: string;
  slug: string;
  description: string;
  price: number;
  ingredients: string[];
  preparation: string[];
  imagePrompt: string;
};

const mockRecipes: MockRecipe[] = [
  {
    title: "Bolo de Cenoura com Cobertura Cremosa",
    slug: "bolo-de-cenoura-cobertura-cremosa",
    description:
      "Bolo fofinho e umido, com cobertura intensa de chocolate para vender ou servir no cafe da tarde.",
    price: 14.9,
    ingredients: [
      "3 cenouras medias picadas",
      "4 ovos",
      "1 xicara de oleo",
      "2 xicaras de acucar",
      "2 e 1/2 xicaras de farinha de trigo",
      "1 colher de sopa de fermento quimico",
      "1 lata de leite condensado",
      "4 colheres de sopa de chocolate em po",
      "1 colher de sopa de manteiga"
    ],
    preparation: [
      "Bata cenoura, ovos e oleo ate formar um creme liso.",
      "Misture o creme com acucar e farinha ate incorporar completamente.",
      "Adicione o fermento por ultimo, mexendo delicadamente.",
      "Asse em forma untada a 180 graus por cerca de 40 minutos.",
      "Prepare a cobertura com leite condensado, chocolate e manteiga ate engrossar.",
      "Finalize espalhando a cobertura sobre o bolo ainda morno."
    ],
    imagePrompt:
      "A Brazilian carrot cake with glossy chocolate frosting, sliced on a ceramic plate, natural kitchen light, appetizing food photography, warm tones, realistic, high detail"
  },
  {
    title: "Lasanha de Frango com Molho Branco",
    slug: "lasanha-de-frango-com-molho-branco",
    description:
      "Lasanha cremosa, bem recheada e perfeita para almoco especial em familia.",
    price: 19.9,
    ingredients: [
      "500 g de peito de frango cozido e desfiado",
      "1 pacote de massa para lasanha",
      "2 colheres de sopa de manteiga",
      "2 colheres de sopa de farinha de trigo",
      "700 ml de leite",
      "1 caixa de creme de leite",
      "200 g de mucarela fatiada",
      "100 g de queijo parmesao ralado",
      "1 cebola picada",
      "2 dentes de alho"
    ],
    preparation: [
      "Refogue cebola e alho, acrescente o frango e tempere bem.",
      "Prepare o molho branco com manteiga, farinha, leite e creme de leite.",
      "Monte camadas de molho, massa, frango e queijo.",
      "Repita as camadas ate finalizar com molho e parmesao.",
      "Leve ao forno preaquecido a 200 graus ate gratinar bem."
    ],
    imagePrompt:
      "A creamy chicken lasagna fresh from the oven, bubbling cheese, white sauce, served in a rustic baking dish, realistic food photography, cozy lunch table, high detail"
  },
  {
    title: "Pudim de Leite Sem Furinhos",
    slug: "pudim-de-leite-sem-furinhos",
    description:
      "Sobremesa classica, lisinha e brilhante, com calda dourada no ponto certo.",
    price: 12.9,
    ingredients: [
      "1 lata de leite condensado",
      "2 medidas da lata de leite integral",
      "3 ovos",
      "1 xicara de acucar para a calda",
      "1/2 xicara de agua"
    ],
    preparation: [
      "Derreta o acucar ate virar caramelo e adicione a agua com cuidado.",
      "Espalhe a calda na forma de pudim.",
      "Bata leite condensado, leite e ovos sem aerar demais.",
      "Despeje na forma e asse em banho-maria coberto com papel-aluminio.",
      "Leve a geladeira por pelo menos 6 horas antes de desenformar."
    ],
    imagePrompt:
      "A Brazilian condensed milk flan with shiny caramel sauce, smooth texture, elegant dessert plate, soft natural light, realistic close-up food photography"
  },
  {
    title: "Torta de Limao Gelada",
    slug: "torta-de-limao-gelada",
    description:
      "Receita refrescante com recheio cremoso e cobertura leve de merengue.",
    price: 13.9,
    ingredients: [
      "200 g de biscoito maisena",
      "100 g de manteiga derretida",
      "2 latas de leite condensado",
      "1 caixa de creme de leite",
      "200 ml de suco de limao",
      "Raspas de limao a gosto",
      "3 claras",
      "4 colheres de sopa de acucar"
    ],
    preparation: [
      "Misture biscoito triturado com manteiga e forre o fundo da forma.",
      "Asse a base por 10 minutos e deixe esfriar.",
      "Misture leite condensado, creme de leite e suco de limao ate engrossar.",
      "Espalhe o recheio sobre a base ja fria.",
      "Bata claras com acucar ate formar merengue firme.",
      "Finalize com raspas de limao e leve para gelar."
    ],
    imagePrompt:
      "A chilled lime pie with toasted meringue peaks and fresh lime zest, elegant bakery presentation, bright daylight, realistic dessert photography, appetizing and fresh"
  },
  {
    title: "Escondidinho de Carne Seca",
    slug: "escondidinho-de-carne-seca",
    description:
      "Prato brasileiro cremoso e marcante, otimo para cardapio especial ou delivery.",
    price: 21.9,
    ingredients: [
      "700 g de aipim cozido",
      "2 colheres de sopa de manteiga",
      "1/2 xicara de leite",
      "500 g de carne seca dessalgada e desfiada",
      "1 cebola roxa fatiada",
      "2 dentes de alho",
      "200 g de queijo mucarela",
      "Cheiro-verde a gosto"
    ],
    preparation: [
      "Amasse o aipim ainda quente e misture com manteiga e leite ate virar pure.",
      "Refogue cebola e alho, junte a carne seca e finalize com cheiro-verde.",
      "Espalhe metade do pure em um refratario.",
      "Cubra com a carne seca refogada e a mucarela.",
      "Finalize com o restante do pure e leve ao forno para gratinar."
    ],
    imagePrompt:
      "A Brazilian escondidinho de carne seca, creamy cassava topping with melted cheese, rustic casserole dish, golden crust, warm home kitchen atmosphere, realistic food photography"
  }
];

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  return new PrismaClient({ adapter }) as PrismaClient;
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generateImage(openai: OpenAI, recipe: MockRecipe, outputPath: string) {
  const response = await openai.images.generate({
    model: "gpt-image-1",
    size: "1024x1024",
    prompt: `${recipe.imagePrompt}. No text, no watermark, no logo.`,
  });

  const imageBase64 = response.data?.[0]?.b64_json;

  if (!imageBase64) {
    throw new Error(`A OpenAI nao retornou imagem para ${recipe.slug}.`);
  }

  await writeFile(outputPath, Buffer.from(imageBase64, "base64"));
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY nao encontrada no .env.");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL nao encontrada no .env.");
  }

  const prisma = createPrismaClient();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const imagesDir = path.join(process.cwd(), "public", "mock-images");

  await mkdir(imagesDir, { recursive: true });

  try {
    for (const recipe of mockRecipes) {
      const imageFileName = `${recipe.slug}.png`;
      const imagePath = path.join(imagesDir, imageFileName);
      const publicImageUrl = `/mock-images/${imageFileName}`;

      if (!(await fileExists(imagePath))) {
        console.log(`Gerando imagem para ${recipe.title}...`);
        await generateImage(openai, recipe, imagePath);
      } else {
        console.log(`Imagem ja existe para ${recipe.title}, reutilizando.`);
      }

      await prisma.recipe.upsert({
        where: { slug: recipe.slug },
        update: {
          title: recipe.title,
          description: recipe.description,
          imageUrl: publicImageUrl,
          videoUrl: "",
          price: recipe.price,
          ingredients: JSON.stringify(recipe.ingredients),
          preparation: JSON.stringify(recipe.preparation),
          active: true,
        },
        create: {
          title: recipe.title,
          slug: recipe.slug,
          description: recipe.description,
          imageUrl: publicImageUrl,
          videoUrl: "",
          price: recipe.price,
          ingredients: JSON.stringify(recipe.ingredients),
          preparation: JSON.stringify(recipe.preparation),
          active: true,
        },
      });

      console.log(`Receita pronta: ${recipe.title}`);
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log("5 receitas mock criadas com sucesso.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});