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
        <UIcon name="i-lucide-mail" class="size-7" />
      </div>
      <h1 class="text-2xl font-bold text-slate-900">Recuperar acesso</h1>
      <p class="mt-2 max-w-sm text-sm text-slate-500">
        Informe o seu e-mail de administrador. Enviaremos um link para criar uma nova senha.
      </p>
    </div>

    <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <!-- Sucesso -->
      <div
        v-if="sucesso"
        class="flex flex-col items-center gap-4 py-4 text-center"
      >
        <div class="flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <UIcon name="i-lucide-check-circle" class="size-7" />
        </div>
        <div>
          <p class="font-semibold text-slate-900">E-mail enviado!</p>
          <p class="mt-1 text-sm text-slate-500">
            Verifique a caixa de entrada de <strong>{{ email }}</strong> e clique no link para criar uma nova senha.
          </p>
        </div>
        <UButton to="/login" label="Voltar ao login" color="primary" variant="outline" size="sm" />
      </div>

      <!-- Formulário -->
      <form v-else class="space-y-5" @submit.prevent="handleSolicitar">
        <UFormField label="E-mail" :error="erros.email || undefined">
          <UInput
            v-model="email"
            type="email"
            placeholder="administrador@empresa.com.br"
            autocomplete="email"
            size="xl"
            class="w-full"
          >
            <template #leading>
              <UIcon name="i-lucide-mail" class="size-4 text-slate-400" />
            </template>
          </UInput>
        </UFormField>

        <div
          v-if="erroGeral"
          class="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <UIcon name="i-lucide-alert-circle" class="size-4 shrink-0" />
          {{ erroGeral }}
        </div>

        <UButton
          type="submit"
          label="Enviar link de recuperação"
          icon="i-lucide-send"
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
useHead({ title: 'Recuperar Senha' })

const colorMode = useColorMode()
onMounted(() => {
  colorMode.preference = 'light'
})

const { carregando } = useAuth()

const email = ref('')
const sucesso = ref(false)
const erroGeral = ref(null)
const erros = reactive({ email: null })

function validar() {
  erros.email = null
  erroGeral.value = null
  let ok = true

  if (!email.value.trim()) {
    erros.email = 'Informe o e-mail.'
    ok = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    erros.email = 'E-mail inválido.'
    ok = false
  }

  return ok
}

async function handleSolicitar() {
  if (!validar()) return

  // Simula envio do e-mail (integração real via useAuth ou API)
  await new Promise(resolve => setTimeout(resolve, 1200))
  sucesso.value = true
}
</script>
