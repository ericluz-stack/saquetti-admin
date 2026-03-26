<template>
  <USlideover
    v-model:open="notificationsOpen"
    title="Notificações"
    description="Atualizações e alertas do painel"
    side="right"
  >
    <template #body>
      <div class="space-y-2">
        <div
          v-for="n in items"
          :key="n.id"
          class="flex gap-3 rounded-lg p-3 transition-colors hover:bg-(--ui-bg-elevated)"
          :class="n.read ? 'opacity-60' : ''"
        >
          <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-(--ui-bg-elevated)">
            <UIcon :name="n.icon" class="size-4 text-(--ui-primary)" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium text-(--ui-text-highlighted)">{{ n.title }}</p>
              <span
                v-if="!n.read"
                class="mt-1 size-2 shrink-0 rounded-full bg-(--ui-primary)"
              />
            </div>
            <p class="mt-0.5 text-xs text-(--ui-text-muted)">{{ n.body }}</p>
            <p class="mt-1 text-[10px] font-medium uppercase tracking-wide text-(--ui-text-dimmed)">{{ n.time }}</p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton
          label="Marcar lidas"
          color="neutral"
          variant="outline"
          class="flex-1"
          @click="markAllRead"
        />
        <UButton
          label="Ver todas"
          color="primary"
          class="flex-1"
          to="/notificacoes"
          @click="notificationsOpen = false"
        />
      </div>
    </template>
  </USlideover>
</template>

<script setup>
const { notificationsOpen } = useDashboardPanels()

const items = ref([
  {
    id: 1,
    icon: 'i-lucide-user-plus',
    title: 'Novo cliente',
    body: 'Empresa "Luz & Cia" concluiu o registo e está aguardando revisão.',
    time: 'há 5 min',
    read: false,
  },
  {
    id: 2,
    icon: 'i-lucide-activity',
    title: 'Pico de utilização',
    body: 'O módulo de monitoramento ultrapassou o limite definido para hoje.',
    time: 'há 1 h',
    read: false,
  },
  {
    id: 3,
    icon: 'i-lucide-message-circle',
    title: 'Ticket de suporte',
    body: 'Resposta #4821 foi atribuída à sua equipa.',
    time: 'ontem',
    read: true,
  },
])

function markAllRead() {
  items.value = items.value.map(i => ({ ...i, read: true }))
}
</script>
