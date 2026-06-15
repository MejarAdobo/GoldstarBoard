import build from "@hono/vite-build/bun";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    build({
      entry: "./src/index.tsx",
    }),
  ],
});
