<script lang="ts">
  let { value = $bindable("streaks") } = $props();
</script>

<div role="radiogroup" class="flex items-center justify-end gap-4">
  <div>
    <input type="radio" id="streaks" name="leaderboard" value="streaks" bind:group={value} />
    <label for="streaks" class="font-semibold text-text">Streaks</label>
  </div>

  <div>
    <input type="radio" id="stars" name="leaderboard" value="stars" bind:group={value} />
    <label for="stars" class="font-semibold text-text">Stars</label>
  </div>
</div>
