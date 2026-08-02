<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    globalThis.localStorage.setItem("theme", isDark ? "dark" : "light");
  };
</script>

<button onclick={toggle} class="bg-secondary rounded-[.67em] p-1.5" aria-label="Toggle dark mode">
  <span class="hidden dark:inline">
    <Moon size={20} class="text-muted-text hover:text-text" />
  </span>
  <span class="inline dark:hidden">
    <Sun size={20} class="text-muted-text hover:text-text" />
  </span>
</button>
