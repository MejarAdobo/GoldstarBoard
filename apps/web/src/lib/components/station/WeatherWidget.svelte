<script lang="ts">
  let { title, value, unit }: { title: string; value: string; unit: string } = $props();

  let displayValue = $derived(value === "null" ? "N/A" : `${value} ${unit}`);
</script>

<div class="bg-secondary/65 rounded-[.67em] px-5 py-3">
  <h3 class="text-text text-center text-lg font-bold lg:text-2xl">{displayValue}</h3>
  <p class="text-muted-text text-center text-base font-semibold lg:text-xl">{title}</p>
</div>
