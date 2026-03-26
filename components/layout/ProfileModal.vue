<template>
  <UModal
    v-model:open="profileModalOpen"
    title="Perfil"
    description="Dados da sua conta (sessão atual)"
  >
    <template #body>
      <div class="space-y-5">
        <div class="flex items-center gap-4">
          <UAvatar src="/admin-avatar.png" size="xl" />
          <div class="min-w-0">
            <p class="font-semibold text-(--ui-text-highlighted)">{{ nomeExibicao }}</p>
            <p class="truncate text-sm text-(--ui-text-muted)">{{ usuario?.email ?? '—' }}</p>
          </div>
        </div>

        <USeparator />

        <dl class="space-y-3 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-(--ui-text-muted)">Empresa</dt>
            <dd class="text-right font-medium text-(--ui-text-highlighted)">{{ usuario?.empresa ?? '—' }}</dd>
          </div>
          <USeparator />
          <div class="flex justify-between gap-4">
            <dt class="text-(--ui-text-muted)">Perfil</dt>
            <dd class="text-right font-medium text-(--ui-text-highlighted)">{{ perfilRotulo }}</dd>
          </div>
          <USeparator />
          <div class="flex justify-between gap-4">
            <dt class="text-(--ui-text-muted)">ID</dt>
            <dd class="font-mono text-xs text-(--ui-text-muted)">{{ usuario?.id ?? '—' }}</dd>
          </div>
        </dl>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <UButton label="Fechar" color="neutral" variant="outline" @click="profileModalOpen = false" />
      </div>
    </template>
  </UModal>
</template>

<script setup>
const { usuario } = useAuth()
const { profileModalOpen } = useDashboardPanels()

const nomeExibicao = computed(() => usuario.value?.nome ?? 'Administrador')

const iniciais = computed(() => {
  const nome = usuario.value?.nome?.trim()
  if (!nome) return 'A'
  const partes = nome.split(/\s+/).filter(Boolean)
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
})

const perfilRotulo = computed(() => {
  const p = usuario.value?.perfil
  if (p === 'super_admin') return 'Super Admin'
  if (p) return p.replace(/_/g, ' ')
  return 'Administrador'
})
</script>
