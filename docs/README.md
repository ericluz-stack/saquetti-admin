# Documentação — Saquetti Admin

Índice para notas de produto, diagramas e referências.

## Conteúdo sugerido

Coloque aqui:

- Diagramas de arquitetura (ex.: `.png`, `.svg`, ou fontes Mermaid em `.md`)
- Fluxos de autenticação e permissões
- Mapa de rotas e módulos do painel
- Decisões de design (paleta, tipografia) quando existirem

## Contexto do projeto

Front-end do módulo de gestão administrativa. Primeiro ambiente do ecossistema; apenas interface, sem integração com back-end ou base de dados nesta fase.

## Histórico de stack

O projeto foi migrado de **Vue 3 + Vite + Vue Router** para **Nuxt 3** com **Tailwind CSS 4**, mantendo tokens globais e convenções de acessibilidade em `assets/css/main.css`.

## Próximos passos (produto)

1. **Autenticação** — formulário de login e fluxos conforme design.
2. **Design system** — quando existir paleta e guia, atualizar variáveis em `assets/css/main.css` (`:root`).
