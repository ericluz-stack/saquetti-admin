/**
 * Restaura e valida a sessão no cliente (SPA).
 * Mantém o usuário alinhado ao mock/API após refresh ou mudança remota de token.
 */
export default defineNuxtPlugin(async () => {
  const { restaurarSessao, validarSessao } = useAuth()
  restaurarSessao()
  await validarSessao()
})
