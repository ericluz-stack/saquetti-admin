<template>
  <div class="space-y-6">

    <!-- Acessos rápidos -->
    <div>
      <h2 class="mb-3 text-sm font-semibold text-(--ui-text-highlighted)">
        Acessos rápidos
      </h2>
      <div class="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <NuxtLink
          v-for="atalho in atalhos"
          :key="atalho.id"
          :to="atalho.to"
          class="group flex items-center gap-3 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) p-4 transition-all duration-200 hover:border-(--ui-primary)/30 hover:shadow-md hover:-translate-y-0.5"
        >
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
            :style="{ background: atalho.iconBg }"
          >
            <UIcon :name="atalho.icon" class="size-5" :style="{ color: atalho.iconColor }" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-(--ui-text-highlighted)">
              {{ atalho.label }}
            </p>
            <p class="truncate text-[11px] text-(--ui-text-muted)">
              {{ atalho.desc }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Visão geral da plataforma -->
    <div>
      <h2 class="mb-3 text-sm font-semibold text-(--ui-text-highlighted)">
        Visão geral da plataforma
      </h2>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="kpi in kpis"
          :key="kpi.label"
          class="rounded-xl border p-4 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
          :class="kpi.tone === 'offline'
            ? 'border-slate-200 bg-linear-to-br from-slate-50 to-white dark:border-slate-700 dark:from-slate-950/80 dark:to-slate-900/40'
            : kpi.tone === 'support'
              ? 'border-blue-200/80 bg-linear-to-br from-blue-50/90 to-white dark:border-blue-900/55 dark:from-blue-950/35 dark:to-slate-950/40'
              : 'border-(--ui-border) bg-(--ui-bg-elevated)'"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="flex size-9 items-center justify-center rounded-lg" :class="kpi.iconClass">
              <UIcon :name="kpi.icon" class="size-4" :class="kpi.iconTextClass" />
            </div>
          </div>
          <p class="text-[11px] font-semibold uppercase tracking-wide text-(--ui-text-muted)">
            {{ kpi.label }}
          </p>
          <p class="mt-1 text-2xl font-bold text-(--ui-text-highlighted)">
            {{ kpi.value }}
          </p>
          <p class="mt-1 text-[11px] text-(--ui-text-dimmed)">
            {{ kpi.sub }}
          </p>
        </div>
      </div>
    </div>

    <!-- Empresas com problema -->
    <div>
      <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-sm font-semibold text-(--ui-text-highlighted)">
          Empresas com problema
        </h2>
        <UBadge
          :label="`${empresasComProblema.length} registo${empresasComProblema.length !== 1 ? 's' : ''}`"
          color="warning"
          variant="subtle"
          size="xs"
        />
      </div>

      <div class="overflow-hidden rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr class="border-b border-(--ui-border) bg-(--ui-bg-muted)">
                <th scope="col" class="px-4 py-3 font-semibold text-(--ui-text-highlighted)">
                  Empresa
                </th>
                <th scope="col" class="px-4 py-3 font-semibold text-(--ui-text-highlighted)">
                  Problema
                </th>
                <th scope="col" class="px-4 py-3 font-semibold text-(--ui-text-highlighted)">
                  Descrição
                </th>
                <th scope="col" class="px-4 py-3 font-semibold text-(--ui-text-highlighted)">
                  Severidade
                </th>
                <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold text-(--ui-text-highlighted)">
                  Desde
                </th>
                <th scope="col" class="whitespace-nowrap px-4 py-3 text-right font-semibold text-(--ui-text-highlighted)">
                  Acesso
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-(--ui-border)">
              <tr
                v-for="empresa in empresasComProblema"
                :key="empresa.id"
                class="transition-colors hover:bg-(--ui-bg-muted)/50"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2.5">
                    <div
                      class="flex size-8 shrink-0 items-center justify-center rounded-lg"
                      :class="empresa.status === 'critico'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-amber-100 dark:bg-amber-900/30'"
                    >
                      <UIcon
                        :name="empresa.icone"
                        class="size-4"
                        :class="empresa.status === 'critico' ? 'text-red-600' : 'text-amber-600'"
                      />
                    </div>
                    <span class="font-medium text-(--ui-text-highlighted)">{{ empresa.nome }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-(--ui-text)">
                  {{ empresa.problema }}
                </td>
                <td class="max-w-xs px-4 py-3 text-(--ui-text-muted)">
                  {{ empresa.descricao }}
                </td>
                <td class="px-4 py-3 align-middle">
                  <div class="flex justify-start sm:justify-center">
                    <UBadge
                      :label="empresa.status === 'critico' ? 'Crítico' : 'Atenção'"
                      :color="empresa.status === 'critico' ? 'error' : 'warning'"
                      variant="subtle"
                      size="lg"
                      class="px-3 py-1 text-sm font-semibold"
                    />
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-[12px] tabular-nums text-(--ui-text-dimmed)">
                  {{ empresa.desde }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-right">
                  <UButton
                    :to="`/clientes/${empresa.id}`"
                    label="Ver empresa"
                    icon="i-lucide-arrow-right"
                    size="xs"
                    color="primary"
                    variant="soft"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { empresasComProblemaMock } from '~/data/empresas-com-problema'

definePageMeta({ layout: 'dashboard' })
useHead({ title: 'Dashboard' })

const empresasComProblema = empresasComProblemaMock

const kpis = [
  {
    label: 'Total de empresas',
    value: '40',
    sub: 'Cadastradas na plataforma',
    icon: 'i-lucide-building-2',
    iconClass: 'bg-blue-100 dark:bg-blue-900/40',
    iconTextClass: 'text-blue-600 dark:text-blue-400',
    tone: 'default',
  },
  {
    label: 'Empresas ativas',
    value: '38',
    sub: '95% do total · com conexão estável',
    icon: 'i-lucide-check-circle',
    iconClass: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconTextClass: 'text-emerald-600 dark:text-emerald-400',
    tone: 'default',
  },
  {
    label: 'Empresas inativas',
    value: '02',
    sub: 'Sem conexão ativa com o serviço',
    icon: 'i-lucide-unplug',
    iconClass: 'bg-slate-200 dark:bg-slate-800',
    iconTextClass: 'text-slate-700 dark:text-slate-300',
    tone: 'offline',
  },
  {
    label: 'Solicitações de suporte',
    value: '11',
    sub: 'Problemas abertos reportados por clientes',
    icon: 'i-lucide-life-buoy',
    iconClass: 'bg-blue-100 dark:bg-blue-900/40',
    iconTextClass: 'text-blue-600 dark:text-blue-400',
    tone: 'support',
  },
]

const atalhos = [
  {
    id: 'clientes',
    to: '/clientes',
    label: 'Gestão de clientes',
    desc: 'Empresas e contratos',
    icon: 'i-lucide-building-2',
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: '#3b82f6',
  },
  {
    id: 'monitoramento',
    to: '/monitoramento',
    label: 'Monitoramento',
    desc: 'Uso e performance',
    icon: 'i-lucide-bar-chart-3',
    iconBg: 'rgba(99,102,241,0.12)',
    iconColor: '#6366f1',
  },
  {
    id: 'suporte',
    to: '/suporte',
    label: 'Suporte',
    desc: 'Tickets e atendimento',
    icon: 'i-lucide-headphones',
    iconBg: 'rgba(16,185,129,0.12)',
    iconColor: '#10b981',
  },
  {
    id: 'administrativo',
    to: '/administrativo',
    label: 'Administrativo',
    desc: 'Sistema e configurações',
    icon: 'i-lucide-settings-2',
    iconBg: 'rgba(100,116,139,0.12)',
    iconColor: '#64748b',
  },
]
</script>
