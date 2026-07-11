<script lang="ts">
    let { station, switchState } = $props();
</script>

<div class="bg-white shadow-md rounded-lg p-4 my-1">
    <h2 class="text-2xl font-bold text-black">{station.name}</h2>
    {#if switchState === "streaks"}
        {#if station.stats.hotStreak > 0}
        <p>{station.stats.hotStreak}</p>
        {:else if station.stats.coldStreak > 0}
        <p>{station.stats.coldStreak}</p>
        {:else}
        <p>0</p>
        {/if}
    {:else}
    <p>{station.stats.star}</p>
    {/if}
</div>
