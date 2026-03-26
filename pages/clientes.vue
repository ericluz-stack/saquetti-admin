<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold text-(--ui-text-highlighted)">
          Usuários
        </h1>
        <p class="mt-0.5 text-sm text-(--ui-text-muted)">
          Equipas, perfis e acesso ao painel
        </p>
      </div>
      <UButton icon="i-lucide-plus" label="Novo usuário" />
    </div>
    <UCard>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <UIcon name="i-lucide-users" class="mb-4 size-10 text-(--ui-text-dimmed)" />
        <p class="text-sm font-medium text-(--ui-text-highlighted)">Módulo em construção</p>
        <p class="mt-1 text-xs text-(--ui-text-muted)">
          Gestão de utilizadores estará disponível em breve.
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard' })
useHead({ title: 'Usuários' })
</script>
