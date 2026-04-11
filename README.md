# 🍰 Receitas da Aline — Blog de Receitas com Pagamento

Blog de receitas exclusivas com sistema de pagamento via **Mercado Pago** (PIX e cartão). Ideal para criadores de conteúdo que divulgam receitas no Instagram e querem monetizar com conteúdo completo.

## Funcionalidades

- **Biblioteca de Receitas** — Grid com todas as receitas disponíveis
- **Sistema de Pagamento** — Checkout via Mercado Pago (PIX + Cartão)
- **Desbloqueio por Receita** — Cada receita é comprada individualmente
- **Vídeo + Texto** — Página da receita com vídeo embed, ingredientes e modo de preparo
- **Minhas Receitas** — Área para o cliente acessar receitas já compradas (por email)
- **Painel Admin** — Gerenciamento de receitas (criar, editar, ativar/desativar)
- **Webhook de Pagamento** — Confirmação automática via Mercado Pago

## Tecnologias

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **Prisma** + SQLite
- **Mercado Pago SDK**

## Como Configurar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Edite o `.env` e preencha:

```env
DATABASE_URL="file:./dev.db"

# Mercado Pago - https://www.mercadopago.com.br/developers
MERCADO_PAGO_ACCESS_TOKEN="seu_access_token_aqui"
MERCADO_PAGO_PUBLIC_KEY="sua_public_key_aqui"

# URL base (altere para produção)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Senha do admin
ADMIN_PASSWORD="sua_senha_segura"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="um-secret-forte"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Obter credenciais do Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie uma aplicação
3. Copie o **Access Token** e a **Public Key** das credenciais de produção
4. Cole no `.env`

### 4. Configurar login com Google

1. Acesse o Google Cloud Console
2. Crie credenciais OAuth 2.0 para aplicativo web
3. Adicione como redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Em produção, adicione também `https://seu-dominio/api/auth/callback/google`
5. Preencha `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` e `NEXTAUTH_SECRET` no `.env`

### 5. Rodar migrações do banco

```bash
npx prisma migrate dev
```

### 6. Iniciar o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Homepage com grid de receitas |
| `/receita/[slug]` | Página da receita (bloqueada ou desbloqueada) |
| `/receita/[slug]?token=xxx` | Receita desbloqueada com token de acesso |
| `/minhas-receitas` | Buscar receitas compradas por email |
| `/pagamento/sucesso` | Página de pagamento aprovado |
| `/pagamento/falha` | Página de pagamento recusado |
| `/pagamento/pendente` | Página de pagamento pendente |
| `/admin` | Painel de administração |

## Fluxo de Compra

1. Usuário vê receita no Instagram (reels/stories)
2. Clica no link do bio → vai para o blog
3. Escolhe a receita → clica em "Desbloquear"
4. Insere email → redirecionado para checkout Mercado Pago
5. Paga via PIX ou cartão
6. Redirecionado de volta → receita desbloqueada
7. Webhook confirma pagamento automaticamente
8. Usuário pode acessar novamente via "Minhas Receitas" usando o email

## Admin

Acesse `/admin` e use a senha definida em `ADMIN_PASSWORD` no `.env`.

No painel, você pode:
- Criar novas receitas
- Editar receitas existentes
- Ativar/desativar receitas

**Dicas para os campos:**
- **URL da Imagem**: Use links de imagens hospedadas (ex: Imgur, Cloudinary)
- **URL do Vídeo**: Use URL de embed do YouTube (ex: `https://www.youtube.com/embed/VIDEO_ID`)
- **Ingredientes**: Um ingrediente por linha
- **Modo de Preparo**: Um passo por linha

## Deploy em Produção

Para produção, recomenda-se:

1. Trocar SQLite por **PostgreSQL** (altere `provider` no `schema.prisma`)
2. Usar credenciais de **produção** do Mercado Pago
3. Configurar `NEXT_PUBLIC_BASE_URL` com o domínio real
4. Configurar webhook no painel do Mercado Pago: `https://seudominio.com/api/webhook`
5. Deploy na **Vercel** ou servidor de sua preferência
