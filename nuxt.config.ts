export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vercel/analytics'],
  nitro: {
    preset: 'vercel'
  }
})
