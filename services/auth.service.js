/**
 * Serviço de Autenticação — Saquetti Admin
 * =========================================
 * MODO ATUAL : Mock local (frontend only)
 * INTEGRAÇÃO : Substituir cada método pelo fetch correspondente à API.
 *              Os comentários "INTEGRAÇÃO →" indicam exatamente onde e como
 *              conectar quando o backend estiver disponível.
 *
 * Rotas esperadas na API:
 *   POST /api/v1/auth/login
 *   POST /api/v1/auth/redefinir-senha
 *   GET  /api/v1/auth/me
 */

// ─────────────────────────────────────────────────────────────────────────────
// USUÁRIOS DE TESTE
// Remover este bloco após integração com banco de dados.
// Em produção as senhas NUNCA devem ser armazenadas em texto puro;
// usar bcrypt (ou argon2) no servidor.
// ─────────────────────────────────────────────────────────────────────────────
const _usuariosMock = [
  {
    id: 1,
    nome: 'Eric Luz',
    email: 'eric.luz@fraktalsoftwares.com.br',
    _senha: 'senhatesteeric',          // ← apenas para teste — nunca em produção
    perfil: 'super_admin',
    empresa: 'Fraktal Softwares',
    avatar: null,
    ativo: true,
    criadoEm: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    nome: 'Administrador Saquetti',
    email: 'admin@saquetti.com',
    _senha: 'admin2026',
    perfil: 'super_admin',
    empresa: 'Saquetti',
    avatar: null,
    ativo: true,
    criadoEm: '2026-03-26T00:00:00.000Z',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gera um token mock para simular um JWT.
 * INTEGRAÇÃO → será substituído pelo JWT retornado pelo backend.
 */
function _gerarTokenMock(userId) {
  const payload = btoa(JSON.stringify({ sub: userId, iat: Date.now(), exp: Date.now() + 8 * 3600_000 }))
  return `mock.${payload}.assinatura`
}

/** Atraso artificial para simular latência de rede. */
const _esperar = ms => new Promise(r => setTimeout(r, ms))

// ─────────────────────────────────────────────────────────────────────────────

export const authService = {

  /**
   * Autentica um administrador.
   *
   * INTEGRAÇÃO → POST /api/v1/auth/login
   *   Body   : { email: string, senha: string }
   *   Retorno: { token: string, usuario: AdminUsuario }
   *
   * @param {string} email
   * @param {string} senha
   * @returns {Promise<{ sucesso: boolean, token?: string, usuario?: object, erro?: string }>}
   */
  async login(email, senha) {
    // ── Mock ─────────────────────────────────────────────────────────────────
    await _esperar(700)

    const admin = _usuariosMock.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
        && u._senha === senha
        && u.ativo,
    )

    if (!admin) {
      return { sucesso: false, erro: 'E-mail ou senha incorretos.' }
    }

    const { _senha, ...usuario } = admin
    return { sucesso: true, token: _gerarTokenMock(admin.id), usuario }
    // ── Fim do mock ───────────────────────────────────────────────────────────

    /*
    // ── INTEGRAÇÃO (descomentar quando o backend estiver pronto) ─────────────
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), senha }),
      })
      const data = await res.json()
      if (!res.ok) return { sucesso: false, erro: data.mensagem ?? 'Falha na autenticação.' }
      return { sucesso: true, token: data.token, usuario: data.usuario }
    } catch {
      return { sucesso: false, erro: 'Serviço indisponível. Tente novamente mais tarde.' }
    }
    // ─────────────────────────────────────────────────────────────────────────
    */
  },

  /**
   * Redefine a senha de um administrador via e-mail.
   *
   * INTEGRAÇÃO → POST /api/v1/auth/redefinir-senha
   *   Body   : { email: string, novaSenha: string }
   *   Retorno: { mensagem: string }
   *
   * @param {string} email
   * @param {string} novaSenha
   * @returns {Promise<{ sucesso: boolean, erro?: string }>}
   */
  async redefinirSenha(email, novaSenha) {
    // ── Mock ─────────────────────────────────────────────────────────────────
    await _esperar(700)

    const admin = _usuariosMock.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase(),
    )

    if (!admin) {
      return { sucesso: false, erro: 'E-mail não encontrado no sistema.' }
    }

    admin._senha = novaSenha // simulação in-memory; sem efeito permanente
    return { sucesso: true }
    // ── Fim do mock ───────────────────────────────────────────────────────────

    /*
    // ── INTEGRAÇÃO ───────────────────────────────────────────────────────────
    try {
      const res = await fetch('/api/v1/auth/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), novaSenha }),
      })
      const data = await res.json()
      if (!res.ok) return { sucesso: false, erro: data.mensagem ?? 'Falha ao redefinir a senha.' }
      return { sucesso: true }
    } catch {
      return { sucesso: false, erro: 'Serviço indisponível. Tente novamente mais tarde.' }
    }
    // ─────────────────────────────────────────────────────────────────────────
    */
  },

  /**
   * Valida o token de sessão e retorna o usuário atualizado.
   *
   * INTEGRAÇÃO → GET /api/v1/auth/me
   *   Header : Authorization: Bearer <token>
   *   Retorno: { usuario: AdminUsuario }
   *
   * @param {string} token
   * @returns {Promise<{ valido: boolean, usuario?: object }>}
   */
  async validarToken(token) {
    // ── Mock ─────────────────────────────────────────────────────────────────
    await _esperar(150)

    if (!token?.startsWith('mock.')) return { valido: false }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))

      // Verifica expiração
      if (payload.exp && Date.now() > payload.exp) return { valido: false }

      const admin = _usuariosMock.find(u => u.id === payload.sub && u.ativo)
      if (!admin) return { valido: false }

      const { _senha, ...usuario } = admin
      return { valido: true, usuario }
    } catch {
      return { valido: false }
    }
    // ── Fim do mock ───────────────────────────────────────────────────────────

    /*
    // ── INTEGRAÇÃO ───────────────────────────────────────────────────────────
    try {
      const res = await fetch('/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return { valido: false }
      const data = await res.json()
      return { valido: true, usuario: data.usuario }
    } catch {
      return { valido: false }
    }
    // ─────────────────────────────────────────────────────────────────────────
    */
  },
}
