/**
 * useAuth — Composable de Autenticação
 * =====================================
 * Estado reativo global de sessão do administrador.
 * Os refs são definidos no escopo do módulo (singleton) para que
 * qualquer componente ou middleware que chame useAuth() compartilhe
 * o mesmo estado, sem necessidade de Pinia ou Vuex.
 */

import { ref, computed, readonly } from 'vue'
import { authService } from '~/services/auth.service'

// ─── Estado global (compartilhado entre todos os chamadores) ─────────────────
const _usuario = ref(null)
const _token   = ref(null)
const _carregando = ref(false)
// ─────────────────────────────────────────────────────────────────────────────

const CHAVE_TOKEN  = 'saquetti_token'
const CHAVE_USUARIO = 'saquetti_usuario'

export function useAuth() {

  /** true se há token válido em memória */
  const isAutenticado = computed(() => !!_token.value)

  // ── Métodos públicos ────────────────────────────────────────────────────────

  /**
   * Realiza login e persiste a sessão.
   * @param {string} email
   * @param {string} senha
   * @returns {Promise<{ sucesso: boolean, erro?: string }>}
   */
  async function login(email, senha) {
    _carregando.value = true
    try {
      const resultado = await authService.login(email, senha)

      if (resultado.sucesso) {
        _usuario.value = resultado.usuario
        _token.value   = resultado.token
        _persistirSessao()
      }

      return resultado
    } finally {
      _carregando.value = false
    }
  }

  /**
   * Encerra a sessão e limpa o armazenamento local.
   */
  function logout() {
    _usuario.value = null
    _token.value   = null
    _limparSessao()
  }

  /**
   * Recarrega a sessão salva no localStorage (chamado na inicialização).
   * Não faz chamada de rede; use validarSessao() para verificar o token
   * com o servidor.
   */
  function restaurarSessao() {
    if (typeof window === 'undefined') return  // ambiente SSR (segurança)
    if (_token.value) return                   // já restaurado

    const token   = localStorage.getItem(CHAVE_TOKEN)
    const usuario = localStorage.getItem(CHAVE_USUARIO)

    if (!token || !usuario) return

    try {
      _token.value   = token
      _usuario.value = JSON.parse(usuario)
    } catch {
      _limparSessao()
    }
  }

  /**
   * Valida o token atual com o serviço (rede) e atualiza os dados do usuário.
   * Encerra a sessão automaticamente se o token estiver inválido/expirado.
   * @returns {Promise<boolean>} true se a sessão for válida
   */
  async function validarSessao() {
    restaurarSessao()
    if (!_token.value) return false

    const { valido, usuario } = await authService.validarToken(_token.value)

    if (!valido) {
      logout()
      return false
    }

    _usuario.value = usuario
    _persistirSessao()
    return true
  }

  /**
   * Redefine a senha do administrador.
   * @param {string} email
   * @param {string} novaSenha
   * @returns {Promise<{ sucesso: boolean, erro?: string }>}
   */
  async function redefinirSenha(email, novaSenha) {
    _carregando.value = true
    try {
      return await authService.redefinirSenha(email, novaSenha)
    } finally {
      _carregando.value = false
    }
  }

  // ── Helpers internos ────────────────────────────────────────────────────────

  function _persistirSessao() {
    if (typeof window === 'undefined') return
    localStorage.setItem(CHAVE_TOKEN,   _token.value)
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(_usuario.value))
  }

  function _limparSessao() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(CHAVE_TOKEN)
    localStorage.removeItem(CHAVE_USUARIO)
  }

  // ── Exposição da API pública ─────────────────────────────────────────────────
  return {
    /** Dados do usuário logado (readonly) */
    usuario: readonly(_usuario),
    /** Estado de carregamento */
    carregando: readonly(_carregando),
    /** true se autenticado */
    isAutenticado,

    login,
    logout,
    restaurarSessao,
    validarSessao,
    redefinirSenha,
  }
}
