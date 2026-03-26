<template>
  <div class="flex min-h-screen flex-col bg-(--ui-bg) text-(--ui-text)">
    <header class="border-b border-(--ui-border) bg-(--ui-bg)">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="text-xl font-medium text-(--ui-text-highlighted)">
          Saquetti
        </NuxtLink>
        <nav class="flex gap-2">
          <UButton to="/" label="Início" color="neutral" variant="ghost" />
          <UButton to="/login" label="Entrar" color="neutral" variant="ghost" />
        </nav>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-(--ui-border) py-4 text-center text-sm text-(--ui-text-muted)">
      Saquetti
    </footer>
  </div>
</template>
