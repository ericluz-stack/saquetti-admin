/**
 * Mock partilhado — empresas em estado degradado (dashboard + detalhe).
 * Substituir por API quando existir backend.
 */
export const empresasComProblemaMock = [
  {
    id: 1,
    nome: 'Grupo Alfa Ltda',
    problema: 'Falha de sincronização',
    descricao: 'Sem batidas recebidas há mais de 2 h; última atualização 08:34.',
    status: 'critico',
    icone: 'i-lucide-wifi-off',
    desde: 'há 2 h',
  },
  {
    id: 2,
    nome: 'Tech Solutions SA',
    problema: 'Erro de integração',
    descricao: '47 registros pendentes no sistema legado; fila não processa.',
    status: 'critico',
    icone: 'i-lucide-plug-zap',
    desde: 'há 4 h',
  },
]

export function getEmpresaComProblemaById(id) {
  const n = Number(id)
  return empresasComProblemaMock.find(e => e.id === n) ?? null
}
