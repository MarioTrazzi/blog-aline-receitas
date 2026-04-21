# Blog da Aline — Next.js (App Router + Tailwind)

Pacote pronto pra plugar no seu projeto Next existente e subir na Vercel.

## Estrutura gerada

```
src/
├── app/
│   ├── globals.css          ← substitui o seu
│   ├── layout.tsx           ← substitui o seu (ou só copie o conteúdo do <body>)
│   ├── page.tsx             ← substitui o seu
│   └── receita/
│       └── [slug]/
│           └── page.tsx     ← nova rota
└── components/
    ├── Masthead.tsx
    ├── Hero.tsx
    ├── RecipeCard.tsx
    ├── RecipeImage.tsx
    ├── Features.tsx
    ├── Testimonials.tsx
    ├── Newsletter.tsx
    └── Footer.tsx
```

## Como aplicar

1. Copie a pasta `nextjs/src/*` para a raiz `src/` do seu projeto Next.
2. **Prisma:** nenhum campo novo foi usado — só `id`, `slug`, `title`, `description`, `imageUrl`, `price`, `active`, `createdAt` (os que já estavam no seu `page.tsx`). Zero migration.
3. **Tailwind:** o `globals.css` importa as fontes do Google + `@tailwind base/components/utilities`. Se você ainda não tem Tailwind configurado, ele já está dado (seu `page.tsx` original usava classes Tailwind, então deve estar).
4. **next/image + domínios externos:** se o `imageUrl` aponta pra um CDN (S3, Cloudinary, etc), adicione no `next.config.ts`:
   ```ts
   images: {
     remotePatterns: [{ protocol: "https", hostname: "seu-cdn.com" }],
   },
   ```
5. **Imagens sem URL:** se a receita não tiver `imageUrl`, o `RecipeImage` renderiza um placeholder texturizado automaticamente. Não quebra.
6. Commit + push — a Vercel faz o deploy.

## Fontes

Importadas via Google Fonts dentro do `globals.css`:
- **Fraunces** (serif editorial — títulos)
- **Instrument Serif** (itálico poético — acentos)
- **Inter** (sans — corpo)
- **JetBrains Mono** (mono — meta / preços)

Se quiser migrar pra `next/font` depois (mais rápido, sem FOUT), me avisa.

## Paywall

Hoje as receitas pagas mostram só um botão "Desbloquear por R$ X" sem integração real. Quando você conectar um gateway (Stripe, Mercado Pago, Kiwify), trocamos o `<button>` pela ação real.
