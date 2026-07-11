<script lang="ts">
    let {value = $bindable("streaks")} = $props()
</script>

<div role="radiogroup" class="flex justify-end items-center gap-4">
    <div>
        <input
            type="radio"
            id="streaks"
            name="leaderboard"
            value="streaks"
            bind:group={value}
        />
        <label for="streaks">Streaks</label>
    </div>

    <div>
        <input
            type="radio"
            id="stars"
            name="leaderboard"
            value="stars"
            bind:group={value}
        />
        <label for="stars">Stars</label>
    </div>
</div>
