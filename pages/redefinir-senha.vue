<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
    <div class="mb-6 w-full max-w-md">
      <UButton
        to="/login"
        icon="i-lucide-arrow-left"
        label="Voltar para login"
        color="neutral"
        variant="link"
        :padded="false"
      />
    </div>

    <div class="mb-8 flex flex-col items-center text-center">
      <div class="mb-4 flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <UIcon name="i-lucide-lock-keyhole" class="size-7" />
      </div>
      <h1 class="text-2xl font-bold text-slate-900">Criar nova senha</h1>
      <p class="mt-2 max-w-sm text-sm text-slate-500">
        Escolha uma senha forte para proteger o seu acesso ao painel.
      </p>
    </div>

    <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <!-- Sucesso -->
      <div
        v-if="sucesso"
        class="flex flex-col items-center gap-4 py-4 text-center"
      >
        <div class="flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <UIcon name="i-lucide-shield-check" class="size-7" />
        </div>
        <div>
          <p class="font-semibold text-slate-900">Senha redefinida!</p>
          <p class="mt-1 text-sm text-slate-500">A sua senha foi atualizada com sucesso. Redirecionando para o login...</p>
        </div>
      </div>

      <!-- Token inválido -->
      <div
        v-else-if="tokenInvalido"
        class="flex flex-col items-center gap-4 py-4 text-center"
      >
        <div class="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-500">
          <UIcon name="i-lucide-alert-triangle" class="size-7" />
        </div>
        <div>
          <p class="font-semibold text-slate-900">Link inválido ou expirado</p>
          <p class="mt-1 text-sm text-slate-500">Solicite um novo link de recuperação.</p>
        </div>
        <UButton to="/recuperar-senha" label="Solicitar novo link" color="primary" />
      </div>

      <!-- Formulário -->
      <form v-else class="space-y-5" @submit.prevent="handleRedefinir">
        <UFormField label="Nova senha" :error="erros.nova || undefined">
          <UInput
            v-model="novaSenha"
            :type="mostrarNova ? 'text' : 'password'"
            placeholder="Mínimo 8 caracteres"
            autocomplete="new-password"
            size="xl"
            class="w-full"
          >
            <template #leading>
              <UIcon name="i-lucide-lock" class="size-4 text-slate-400" />
            </template>
            <template #trailing>
              <UButton
                :icon="mostrarNova ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                color="neutral"
                variant="link"
                size="sm"
                :padded="false"
                tabindex="-1"
                @click="mostrarNova = !mostrarNova"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField label="Confirmar senha" :error="erros.confirmar || undefined">
          <UInput
            v-model="confirmarSenha"
            :type="mostrarConfirmar ? 'text' : 'password'"
            placeholder="Digite novamente"
            autocomplete="new-password"
            size="xl"
            class="w-full"
          >
            <template #leading>
              <UIcon name="i-lucide-lock" class="size-4 text-slate-400" />
            </template>
            <template #trailing>
              <UButton
                :icon="mostrarConfirmar ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                color="neutral"
                variant="link"
                size="sm"
                :padded="false"
                tabindex="-1"
                @click="mostrarConfirmar = !mostrarConfirmar"
              />
            </template>
          </UInput>
        </UFormField>

        <!-- Requisitos visuais -->
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p class="mb-2 text-[11px] font-semibold text-slate-600">Requisitos:</p>
          <ul class="space-y-1">
            <li
              v-for="req in requisitos"
              :key="req.texto"
              class="flex items-center gap-2 text-[11px]"
              :class="req.ok ? 'text-green-600' : 'text-slate-400'"
            >
              <UIcon :name="req.ok ? 'i-lucide-check' : 'i-lucide-circle'" class="size-3 shrink-0" />
              {{ req.texto }}
            </li>
          </ul>
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
          label="Salvar nova senha"
          icon="i-lucide-shield-check"
          size="lg"
          block
          :loading="carregando"
          class="font-bold"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })
useHead({ title: 'Redefinir Senha' })

const colorMode = useColorMode()
onMounted(() => {
  colorMode.preference = 'light'
})

const route = useRoute()
const router = useRouter()
const { carregando } = useAuth()

const token = computed(() => route.query.token)
const tokenInvalido = computed(() => !token.value)

const novaSenha = ref('')
const confirmarSenha = ref('')
const mostrarNova = ref(false)
const mostrarConfirmar = ref(false)
const sucesso = ref(false)
const erroGeral = ref(null)
const erros = reactive({ nova: null, confirmar: null })

const requisitos = computed(() => {
  const s = novaSenha.value
  return [
    { texto: 'Mínimo de 8 caracteres', ok: s.length >= 8 },
    { texto: 'Incluir letras e números', ok: /[A-Za-z]/.test(s) && /\d/.test(s) },
  ]
})

async function handleRedefinir() {
  erros.nova = null
  erros.confirmar = null
  erroGeral.value = null

  if (novaSenha.value.length < 8) {
    erros.nova = 'A senha deve ter no mínimo 8 caracteres.'
    return
  }
  if (!requisitos.value[1].ok) {
    erros.nova = 'Inclua letras e números.'
    return
  }
  if (novaSenha.value !== confirmarSenha.value) {
    erros.confirmar = 'As senhas não coincidem.'
    return
  }

  // Simula chamada de API com o token
  await new Promise(resolve => setTimeout(resolve, 1000))
  sucesso.value = true
  setTimeout(() => router.push('/login'), 2000)
}
</script>
