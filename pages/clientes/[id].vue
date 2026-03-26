<template>
  <div>
    <div class="mb-6">
      <UButton
        to="/"
        icon="i-lucide-arrow-left"
        label="Voltar ao dashboard"
        color="neutral"
        variant="ghost"
        size="sm"
        class="-ml-2 mb-4"
      />
      <template v-if="empresa">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-3">
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-xl"
              :class="empresa.status === 'critico'
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'"
            >
              <UIcon
                :name="empresa.icone"
                class="size-6"
                :class="empresa.status === 'critico' ? 'text-red-600' : 'text-amber-600'"
              />
            </div>
            <div>
              <h1 class="text-xl font-semibold text-(--ui-text-highlighted)">
                {{ empresa.nome }}
              </h1>
              <p class="mt-0.5 text-sm text-(--ui-text-muted)">
                Situação operacional e ações recomendadas
              </p>
              <div class="mt-3 flex flex-wrap items-center gap-2">
                <UBadge
                  :label="empresa.status === 'critico' ? 'Crítico' : 'Atenção'"
                  :color="empresa.status === 'critico' ? 'error' : 'warning'"
                  variant="subtle"
                  size="sm"
                />
                <span class="text-xs text-(--ui-text-dimmed)">
                  Detectado {{ empresa.desde }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <template v-if="empresa">
      <div class="grid gap-4 lg:grid-cols-3">
        <UCard class="lg:col-span-2">
          <template #header>
            <p class="font-semibold text-(--ui-text-highlighted)">
              Resumo do problema
            </p>
          </template>
          <div class="space-y-4 text-sm">
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wide text-(--ui-text-muted)">
                Motivo
              </p>
              <p class="mt-1 text-(--ui-text)">
                {{ empresa.problema }}
              </p>
            </div>
            <USeparator />
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wide text-(--ui-text-muted)">
                Detalhes
              </p>
              <p class="mt-1 text-(--ui-text-muted)">
                {{ empresa.descricao }}
              </p>
            </div>
          </div>
        </UCard>
        <UCard>
          <template #header>
            <p class="font-semibold text-(--ui-text-highlighted)">
              Próximos passos
            </p>
          </template>
          <ul class="list-inside list-disc space-y-2 text-sm text-(--ui-text-muted)">
            <li>Rever integrações e registos recentes</li>
            <li>Contactar responsável na empresa</li>
            <li>Documentar resolução no histórico do cliente</li>
          </ul>
          <div class="mt-4">
            <UButton
              to="/suporte"
              icon="i-lucide-headphones"
              label="Abrir suporte"
              color="primary"
              block
            />
          </div>
        </UCard>
      </div>
    </template>

    <UCard v-else>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <UIcon name="i-lucide-building-2" class="mb-4 size-10 text-(--ui-text-dimmed)" />
        <p class="text-sm font-medium text-(--ui-text-highlighted)">
          Empresa não encontrada
        </p>
        <p class="mt-1 text-xs text-(--ui-text-muted)">
          O identificador não corresponde a nenhuma empresa com incidente ativo.
        </p>
        <UButton to="/" label="Ir para o dashboard" class="mt-6" color="primary" />
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { getEmpresaComProblemaById } from '~/data/empresas-com-problema'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const empresa = computed(() => getEmpresaComProblemaById(route.params.id))

const tituloPagina = computed(() =>
  empresa.value ? empresa.value.nome : 'Empresa',
)

useHead(() => ({
  title: tituloPagina.value,
}))
</script>
