# Saquetti — Admin

Painel administrativo Saquetti. A autenticação usa uma camada **mock** no browser (`services/auth.service.js`), pronta para trocar por chamadas `fetch` à API quando o backend existir.

## Stack

- **Nuxt 3** (SPA: `ssr: false`)
- **Vue 3** (Composition API)
- **Tailwind CSS 4** (`@import "tailwindcss"` + PostCSS)

## Começar

```bash
npm install
npm run dev
```

- `npm run build` — build de produção  
- `npm run preview` — pré-visualizar o build  
- `npm run lint` — ESLint  

Documentação de produto e notas de arquitetura: [docs/README.md](docs/README.md).

## Autenticação (desenvolvimento)

- `composables/useAuth.js` — estado de sessão e métodos `login` / `logout` / `redefinirSenha` / `validarSessao`
- `middleware/auth.global.js` — protege rotas (exceto `/login` e `/recuperar-senha`)
- `plugins/auth.client.js` — restaura e valida o token ao carregar o SPA

**Conta mock para testes** (remover em produção; credenciais definidas em `services/auth.service.js`):

| Campo | Valor |
| --- | --- |
| E-mail | `eric.luz@fraktalsoftwares.com.br` |
| Senha | `senhatesteeric` |

## Estrutura (Nuxt)

- `pages/` — rotas (`index` → dashboard, `login`, `recuperar-senha`, módulos stub)
- `layouts/` — `auth.vue` (login), `dashboard.vue` (área logada)
- `components/` — componentes auto-importados
- `composables/` — composables auto-importados
- `assets/` — ficheiros processados pelo build (imagens, CSS adicional)
- `public/` — ficheiros estáticos
- `assets/css/main.css` — Tailwind + tokens CSS + acessibilidade

## Acessibilidade e LGPD

- Foco visível (`:focus-visible`) e tokens pensados para contraste.
- Respeito a `prefers-reduced-motion`.
- Fluxos e textos LGPD no conteúdo das páginas.
