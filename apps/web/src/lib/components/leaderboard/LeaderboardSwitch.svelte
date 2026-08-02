<script lang="ts">
  let { value = $bindable("streaks") } = $props();
</script>

<div role="radiogroup" class="bg-primary inline-flex items-center rounded-[0.67em] p-1 select-none">
  <label
    for="streaks"
    class={`relative flex-1 cursor-pointer rounded-[0.67em] px-2 py-1.5 text-center text-sm font-semibold transition-all duration-200 lg:px-4 ${
      value === "streaks" ? "bg-tertiary text-primary" : "text-text/60 hover:text-text"
    }`}
  >
    <input type="radio" id="streaks" name="leaderboard" value="streaks" bind:group={value} class="sr-only" />
    Streaks
  </label>

  <label
    for="stars"
    class={`relative flex-1 cursor-pointer rounded-[0.67em] px-2 py-1.5 text-center text-sm font-semibold transition-all duration-200 lg:px-4 ${
      value === "stars" ? "bg-tertiary text-primary" : "text-text/60 hover:text-text"
    }`}
  >
    <input type="radio" id="stars" name="leaderboard" value="stars" bind:group={value} class="sr-only" />
    Stars
  </label>
</div>
