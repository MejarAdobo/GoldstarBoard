<script lang="ts">
  let { value = $bindable("metric") } = $props();
</script>

<div role="radiogroup" class="bg-secondary/50 inline-flex items-center rounded-[0.67em] p-1 select-none">
  <label
    for="metric"
    class={`relative flex-1 cursor-pointer rounded-[0.67em] px-2 py-1.5 text-center text-sm font-semibold transition-all duration-200 lg:px-4 ${
      value === "metric" ? "bg-tertiary text-primary" : "text-text/60 hover:text-text"
    }`}
  >
    <input type="radio" id="metric" name="station" value="metric" bind:group={value} class="sr-only" />
    Metric
  </label>

  <label
    for="imperial"
    class={`relative flex-1 cursor-pointer rounded-[0.67em] px-2 py-1.5 text-center text-sm font-semibold transition-all duration-200 lg:px-4 ${
      value === "imperial" ? "bg-tertiary text-primary" : "text-text/60 hover:text-text"
    }`}
  >
    <input type="radio" id="imperial" name="station" value="imperial" bind:group={value} class="sr-only" />
    Imperial
  </label>
</div>
