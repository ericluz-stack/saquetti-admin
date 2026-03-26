<template>
  <aside
    class="fixed inset-y-0 left-0 z-30 flex w-52 flex-col border-r border-(--ui-border) bg-white dark:bg-slate-950 dark:border-slate-800"
  >
    <!-- Logo -->
    <div class="flex h-14 shrink-0 items-center justify-between border-b border-(--ui-border) dark:border-slate-800 px-5">
      <NuxtLink to="/" class="flex items-center gap-2.5 outline-none">
        <img src="/logotipocolor.svg" class="size-7 dark:hidden transition-transform group-hover:scale-105" alt="Saquetti Logo">
        <img src="/logotipobranco.svg" class="hidden size-7 dark:block transition-transform group-hover:scale-105" alt="Saquetti Logo">
        <span class="text-sm font-bold tracking-tight text-slate-800 dark:text-white">Saquetti</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 pt-3 pb-4">
      <div v-for="section in sections" :key="section.label" class="mb-5 last:mb-0">
        <p class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {{ section.label }}
        </p>
        <div class="space-y-0.5">
          <NuxtLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-150"
            :class="[
              isActive(item.to)
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
            ]"
          >
            <UIcon :name="item.icon" class="size-[18px] shrink-0" />
            <span class="min-w-0 truncate">{{ item.label }}</span>
            <UBadge
              v-if="item.badge"
              :label="String(item.badge)"
              color="primary"
              variant="solid"
              size="xs"
              class="ml-auto"
            />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="shrink-0 border-t border-(--ui-border) dark:border-slate-800 px-3 py-3">
      <p class="px-2 text-[10px] text-slate-400 dark:text-slate-600">v1.0.0 · Saquetti Admin</p>
    </div>
  </aside>
</template>

<script setup>
const route = useRoute()

const sections = [
  {
    label: 'Geral',
    items: [
      { to: '/', label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
    ],
  },
  {
    label: 'Gestão',
    items: [
      { to: '/clientes', label: 'Usuários', icon: 'i-lucide-users' },
      { to: '/monitoramento', label: 'Monitoramento', icon: 'i-lucide-bar-chart-3' },
      { to: '/suporte', label: 'Suporte', icon: 'i-lucide-headphones' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { to: '/administrativo', label: 'Administrativo', icon: 'i-lucide-settings-2' },
      { to: '/notificacoes', label: 'Notificações', icon: 'i-lucide-bell', badge: 3 },
    ],
  },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
