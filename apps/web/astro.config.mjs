import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte(), playformCompress()],
});
