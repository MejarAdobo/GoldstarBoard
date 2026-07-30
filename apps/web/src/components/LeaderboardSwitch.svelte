<script lang="ts">
  let { value = $bindable("streaks") } = $props();
</script>

<div
  role="radiogroup"
  class="inline-flex items-center p-1 bg-primary rounded-[0.67em] select-none"
>
  <label
    for="streaks"
    class={`relative flex-1 px-4 py-1.5 text-sm font-semibold rounded-[0.67em] cursor-pointer transition-all duration-200 text-center ${
      value === 'streaks'
        ? 'bg-tertiary text-primary'
        : 'text-text/60 hover:text-text'
    }`}
  >
    <input
      type="radio"
      id="streaks"
      name="leaderboard"
      value="streaks"
      bind:group={value}
      class="sr-only"
    />
    Streaks
  </label>

  <label
    for="stars"
    class={`relative flex-1 px-4 py-1.5 text-sm font-semibold rounded-[0.67em] cursor-pointer transition-all duration-200 text-center ${
      value === 'stars'
        ? 'bg-tertiary text-primary'
        : 'text-text/60 hover:text-text'
    }`}
  >
    <input
      type="radio"
      id="stars"
      name="leaderboard"
      value="stars"
      bind:group={value}
      class="sr-only"
    />
    Stars
  </label>
</div>
