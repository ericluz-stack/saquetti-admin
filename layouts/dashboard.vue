<template>
  <div class="flex min-h-screen bg-(--ui-bg)">
    <LayoutAppSidebar />

    <div class="flex min-w-0 flex-1 flex-col lg:ml-52">
      <!-- Top bar -->
      <header class="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-(--ui-border) bg-(--ui-bg)/90 px-4 backdrop-blur-md sm:px-6">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5 text-sm text-(--ui-text-muted)">
          <NuxtLink to="/" class="hover:text-(--ui-text) transition-colors">Páginas</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3.5" />
          <span class="font-semibold text-(--ui-text-highlighted)">{{ pageTitle }}</span>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-1">
          <!-- Search -->
          <UButton
            icon="i-lucide-search"
            color="neutral"
            variant="ghost"
            size="md"
            aria-label="Pesquisar"
            @click="commandSearchOpen = true"
          />

          <!-- Notifications -->
          <UButton
            color="neutral"
            variant="ghost"
            size="md"
            aria-label="Notificações"
            @click="toggleNotifications"
          >
            <template #leading>
              <span class="relative inline-flex">
                <UIcon name="i-lucide-bell" class="size-5" />
                <span class="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-extrabold text-white ring-2 ring-(--ui-bg) shadow-sm shadow-red-500/20">3</span>
              </span>
            </template>
          </UButton>

          <!-- Dark mode toggle -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            color="neutral"
            variant="ghost"
            size="md"
            :aria-label="colorMode.value === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
            @click="toggleColorMode"
          />

          <!-- Separator -->
          <div class="mx-1.5 h-6 w-px bg-(--ui-border)" />

          <!-- User menu -->
          <LayoutUserAccountMenu />
        </div>
      </header>

      <main class="flex-1 p-4 sm:p-6">
        <slot />
      </main>
    </div>

    <LayoutNotificationsPanel />
    <LayoutProfileModal />
    <LayoutCommandSearchModal />
  </div>
</template>

<script setup>
import { getEmpresaComProblemaById } from '~/data/empresas-com-problema'

const route = useRoute()
const colorMode = useColorMode()
const {
  commandSearchOpen,
  notificationsOpen,
  closeAllPanels,
} = useDashboardPanels()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function toggleNotifications() {
  const next = !notificationsOpen.value
  closeAllPanels()
  notificationsOpen.value = next
}

const pageTitles = {
  '/': 'Dashboard',
  '/clientes': 'Usuários',
  '/monitoramento': 'Monitoramento',
  '/suporte': 'Suporte',
  '/administrativo': 'Administrativo',
  '/notificacoes': 'Notificações',
}

const pageTitle = computed(() => {
  const detailMatch = route.path.match(/^\/clientes\/(\d+)$/)
  if (detailMatch) {
    const emp = getEmpresaComProblemaById(detailMatch[1])
    return emp?.nome ?? 'Empresa'
  }
  for (const [path, title] of Object.entries(pageTitles)) {
    if (path === '/' && route.path === '/') return title
    if (path !== '/' && route.path.startsWith(path)) return title
  }
  return 'Página'
})

watch(
  () => route.path,
  () => closeAllPanels(),
)

function onGlobalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    commandSearchOpen.value = true
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onGlobalKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onGlobalKeydown)
  }
})
</script>
