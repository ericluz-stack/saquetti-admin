<template>
  <UModal
    v-model:open="commandSearchOpen"
    :ui="{ width: 'sm:max-w-lg' }"
  >
    <template #content>
      <UCommandPalette
        :groups="groups"
        placeholder="Ir para…"
        :ui="{ input: '[&>input]:h-12' }"
        @update:model-value="onSelect"
      />
    </template>
  </UModal>
</template>

<script setup>
const { commandSearchOpen } = useDashboardPanels()

const groups = computed(() => [
  {
    id: 'pages',
    label: 'Páginas',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/' },
      { id: 'clientes', label: 'Clientes', icon: 'i-lucide-users', to: '/clientes' },
      { id: 'monitoramento', label: 'Monitoramento', icon: 'i-lucide-bar-chart-3', to: '/monitoramento' },
      { id: 'suporte', label: 'Suporte', icon: 'i-lucide-headphones', to: '/suporte' },
      { id: 'administrativo', label: 'Administrativo', icon: 'i-lucide-settings', to: '/administrativo' },
      { id: 'notificacoes', label: 'Notificações', icon: 'i-lucide-bell', to: '/notificacoes' },
    ],
  },
])

async function onSelect(item) {
  if (item?.to) {
    commandSearchOpen.value = false
    await navigateTo(item.to)
  }
}
</script>
