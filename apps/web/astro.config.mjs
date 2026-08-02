import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig, envField, memoryCache } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
  env: {
    schema: {
      API_URL: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  cache: {
    provider: memoryCache(),
  },
});
