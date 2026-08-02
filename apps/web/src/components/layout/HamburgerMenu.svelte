<script lang="ts">
  import { Menu, X } from "@lucide/svelte";

  let { children } = $props();
  let isOpen = $state(false);

  const toggle = () => (isOpen = !isOpen);
</script>

<button onclick={toggle} class="p-2 lg:hidden" aria-label="Toggle Menu">
  <Menu size={24} />
</button>

{#if isOpen}
  <!-- Dimmed Backdrop -->
  <div class="fixed inset-0 z-40 bg-secondary/50 lg:hidden" onclick={toggle} aria-hidden="true"></div>

  <!-- Side Drawer -->
  <aside class="fixed top-0 right-0 z-50 flex h-full w-64 flex-col gap-6 bg-primary p-6">
    <div class="flex justify-end">
      <button onclick={toggle} class="p-2" aria-label="Close Menu">
        <X size={24} />
      </button>
    </div>

    <nav class="flex flex-col gap-6 text-lg font-semibold text-text">
      {@render children?.()}
    </nav>
  </aside>
{/if}
