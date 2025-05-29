export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  srcDir: "src/",
  alias: {
    "@": "src/",
  },
  modules: ["@nuxtjs/tailwindcss"],
});
