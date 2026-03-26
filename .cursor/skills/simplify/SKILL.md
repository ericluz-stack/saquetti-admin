---
name: simplify
description: Revisa arquivos alterados recentemente para reutilização de código, qualidade e eficiência, então aplica correções preservando o comportamento. Use quando o usuário pedir para simplificar código, limpar alterações recentes ou melhorar clareza sem mudar funcionalidade.
---

# Simplify

Revisa e refina código recentemente modificado para melhorar clareza, consistência e manutenção, **sem alterar o comportamento**.

## Quando usar

- Usuário pede `/simplify` ou "simplificar o código"
- Após implementar features ou correções, para limpar o trabalho
- Foco opcional: `/simplify memory efficiency`, `/simplify error handling`, `/simplify reduce duplication`

## Princípios

1. **Preservar funcionalidade** — nunca mudar o que o código faz, só como faz
2. **Clareza sobre brevidade** — legibilidade primeiro; evitar simplificação excessiva
3. **Manter abstrações úteis** — não remover só por ser "menos linhas"
4. **Seguir padrões do projeto** — respeitar CLAUDE.md, convenções e estilo existente

## O que fazer

- Remover comentários desnecessários ou óbvios
- Consolidar lógica repetida (DRY)
- Melhorar nomes de variáveis/funções para clareza
- Eliminar código redundante ou morto
- Evitar ternários aninhados — preferir `switch` ou cadeias `if/else` quando legível
- Tratamento de erros explícito e consistente
- Imports e tipos alinhados ao padrão do projeto (ex.: ES modules com extensões, tipos de retorno explícitos quando aplicável)

## O que evitar

- Reescrever código que já está claro
- Remover abstrações que ajudam na leitura ou reuso
- Mudar comportamento ou casos de borda
- Simplificar a ponto de ofuscar a intenção

## Fluxo

1. Identificar arquivos alterados recentemente (git diff, histórico da sessão ou arquivos indicados pelo usuário)
2. Analisar cada alteração: duplicação, nomes, estrutura, tratamento de erros
3. Aplicar refinamentos que melhorem clareza e consistência sem mudar o que o código faz
4. Confirmar que o comportamento permanece o mesmo (testes ou revisão lógica)
