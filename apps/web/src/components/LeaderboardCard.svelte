<script lang="ts">
    let { station, switchState } = $props();
</script>

<div class="bg-white shadow-md rounded-lg p-4 my-1">
    <h2 class="text-2xl font-bold text-black">{station.name}</h2>
    {#if switchState === "streaks"}
        {#if station.hotStreak > 0}
        <p>{station.hotStreak}</p>
        {:else if station.coldStreak > 0}
        <p>{station.coldStreak}</p>
        {:else}
        <p>0</p>
        {/if}
    {:else}
    <p>{station.star}</p>
    {/if}
</div>
