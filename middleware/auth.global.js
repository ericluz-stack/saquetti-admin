/**
 * Middleware global de autenticação — Saquetti Admin
 * ====================================================
 * Executado automaticamente em toda navegação de rota.
 *
 * Regras:
 *  • Rotas públicas (/login, /recuperar-senha): redireciona para o
 *    dashboard se o usuário já estiver autenticado.
 *  • Rotas protegidas (todas as demais): redireciona para /login se
 *    o usuário não estiver autenticado.
 */

const ROTAS_PUBLICAS = ['/login', '/recuperar-senha']

export default defineNuxtRouteMiddleware((to) => {
  const { isAutenticado, restaurarSessao } = useAuth()

  // Tenta recuperar sessão salva no localStorage antes de decidir
  restaurarSessao()

  const ePublica = ROTAS_PUBLICAS.includes(to.path)

  if (ePublica) {
    // Se já autenticado, não precisa ver login/recuperar-senha → vai ao dashboard
    if (isAutenticado.value) return navigateTo('/')
    return
  }

  // Rota protegida: exige autenticação
  if (!isAutenticado.value) {
    return navigateTo('/login')
  }
})
