<template>
  <UDropdownMenu :items="menuItems" :content="{ align: 'end', side: 'bottom', sideOffset: 4 }">
    <button
      type="button"
      class="flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all duration-200 hover:bg-(--ui-bg-elevated) hover:shadow-sm"
    >
      <UAvatar src="/admin-avatar.png" :alt="nomeExibicao" size="sm" class="ring-2 ring-blue-500/10" />
      <div class="hidden min-w-0 sm:block">
        <p class="truncate text-xs font-bold text-(--ui-text-highlighted)">{{ nomeExibicao }}</p>
        <p class="truncate text-[10px] font-medium text-(--ui-text-dimmed)">{{ perfilRotulo }}</p>
      </div>
    </button>
  </UDropdownMenu>
</template>

<script setup>
const { usuario, logout } = useAuth()
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

async function handleSair() {
  logout()
  await navigateTo('/login')
}

const menuItems = computed(() => [
  [
    {
      label: 'Meu perfil',
      icon: 'i-lucide-user',
      onSelect() {
        profileModalOpen.value = true
      },
    },
    {
      label: 'Definições',
      icon: 'i-lucide-sliders-horizontal',
      to: '/administrativo',
    },
  ],
  [
    {
      label: 'Sair da conta',
      icon: 'i-lucide-log-out',
      onSelect() {
        handleSair()
      },
    },
  ],
])
</script>
