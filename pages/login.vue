<template>
  <div class="flex min-h-screen flex-col lg:flex-row">
    <!-- Hero panel -->
    <div class="relative hidden min-h-[220px] flex-[0_0_100%] overflow-hidden lg:flex lg:min-h-0 lg:flex-[0_0_40%]">
      <div
        class="absolute inset-0"
        style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #172554 100%);"
      />
      <div class="relative z-[1] flex h-full min-h-[320px] flex-col justify-between p-8 text-white lg:min-h-screen lg:p-10">
        <div class="flex items-center gap-2.5">
          <img src="/logotipobranco.svg" class="size-9" alt="Saquetti Logo">
          <span class="text-lg font-semibold tracking-tight">Saquetti</span>
        </div>
        <div class="max-w-md">
          <p class="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            Todas as ferramentas que a sua equipa precisa para gerir o ponto com confiança.
          </p>
          <USeparator class="my-6 border-white/20" />
          <p class="font-semibold">Equipa Saquetti</p>
          <p class="mt-1 text-sm text-white/80">Gestão de ponto e administração</p>
        </div>
      </div>
    </div>

    <!-- Form panel -->
    <div class="flex flex-1 flex-col justify-center bg-(--ui-bg) px-6 py-10 sm:px-10 lg:px-16 xl:px-20">
      <div class="mx-auto w-full max-w-md">
        <div class="mb-10 flex items-center gap-2.5 lg:hidden">
          <img src="/logotipocolor.svg" class="size-9" alt="Saquetti Logo">
          <span class="text-xl font-bold tracking-tight text-slate-900">Saquetti</span>
        </div>

        <h1 class="text-2xl font-semibold tracking-tight text-(--ui-text-highlighted)">
          Bem-vindo de volta ao Saquetti
        </h1>
        <p class="mt-2 text-sm leading-relaxed text-(--ui-text-muted)">
          Aceda ao painel administrativo com a sua conta.
        </p>

        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <UFormField label="E-mail" :error="erros.email || undefined">
            <UInput
              v-model="email"
              type="email"
              placeholder="nome@empresa.com.br"
              autocomplete="email"
              size="xl"
              class="w-full"
            >
              <template #leading>
                <UIcon name="i-lucide-mail" class="size-4 text-slate-400" />
              </template>
            </UInput>
          </UFormField>

          <UFormField label="Palavra-passe" :error="erros.senha || undefined">
            <UInput
              v-model="senha"
              :type="mostrarSenha ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password"
              size="xl"
              class="w-full"
            >
              <template #leading>
                <UIcon name="i-lucide-lock" class="size-4 text-slate-400" />
              </template>
              <template #trailing>
                <UButton
                  :icon="mostrarSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  color="neutral"
                  variant="link"
                  size="sm"
                  :padded="false"
                  tabindex="-1"
                  @click="mostrarSenha = !mostrarSenha"
                />
              </template>
            </UInput>
          </UFormField>

          <div class="flex items-center justify-between">
            <UCheckbox v-model="lembrar" label="Lembrar sessão" />
            <NuxtLink to="/recuperar-senha" class="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              Esqueceu a senha?
            </NuxtLink>
          </div>

          <div
            v-if="erroGeral"
            class="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            <UIcon name="i-lucide-alert-circle" class="size-4 shrink-0" />
            {{ erroGeral }}
          </div>

          <UButton
            type="submit"
            label="Entrar no Painel"
            icon="i-lucide-log-in"
            size="lg"
            block
            :loading="carregando"
            class="font-bold py-3"
          />
        </form>

        <p class="mt-10 text-center text-sm text-(--ui-text-muted)">
          Acesso exclusivo para administradores.
          <a href="mailto:suporte@saquetti.com" class="font-semibold text-(--ui-primary) hover:underline">Contacte o suporte</a>
        </p>

        <p class="mt-6 text-center text-xs text-(--ui-text-dimmed)">
          &copy; {{ ano }} Saquetti — Sistema de Gestão de Ponto
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })
useHead({ title: 'Login' })

const colorMode = useColorMode()
onMounted(() => {
  colorMode.preference = 'light'
})

const router = useRouter()
const { login, carregando } = useAuth()

const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)
const lembrar = ref(true)
const erroGeral = ref(null)
const erros = reactive({ email: null, senha: null })

const ano = new Date().getFullYear()

function validar() {
  erros.email = null
  erros.senha = null
  let valido = true

  if (!email.value.trim()) {
    erros.email = 'Indique o e-mail.'
    valido = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    erros.email = 'E-mail inválido.'
    valido = false
  }

  if (!senha.value) {
    erros.senha = 'Indique a palavra-passe.'
    valido = false
  }

  return valido
}

async function handleLogin() {
  erroGeral.value = null
  if (!validar()) return

  const resultado = await login(email.value.trim(), senha.value)

  if (!resultado.sucesso) {
    erroGeral.value = resultado.erro
    return
  }

  router.push('/')
}
</script>
