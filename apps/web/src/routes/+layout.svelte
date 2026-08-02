<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import Header from "$lib/components/layout/Header.svelte";
  import "./layout.css";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />

<div class="bg-secondary flex-1 rounded-[.67em]">
  {@render children()}
</div>
