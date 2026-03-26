// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 3,
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  app: {
    head: {
      title: 'Dashboard',
      titleTemplate: '%s — Saquetti Admin',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logotipobranco.svg' }
      ]
    },
  },
  css: ['~/assets/css/main.css'],
})
