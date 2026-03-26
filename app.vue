<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — Saquetti Admin` : 'Saquetti Admin'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' }
  ]
})
</script>

<template>
  <UApp shadow>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
