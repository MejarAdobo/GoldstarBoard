<script lang="ts">
    import { IconCircleFilled } from '@tabler/icons-svelte/IconCircleFilled.svelte';


    let { station, hourlyData, switchState } = $props();
</script>

<div class="bg-white shadow-md rounded-lg p-4 my-1 flex gap-2 w-full justify-between">
    <div class="flex justify-between items-center gap-4">
        <!-- Ranking -->
        <div class="flex items-center py-4 px-5.5 border-2 border-blue-300 rounded-xl">
            <p class="text-4xl font-bold text-black">{station.ranking}</p>
        </div>
        <!-- Station Name -->
        <div class="flex flex-col">
            <h2 class="text-2xl font-bold text-black">{station.name}</h2>
            <div class="flex items-center gap-2">
                <IconCircleFilled />
                <p class="text-md text-black">{hourlyData.status ? "Online" : "Offline"}</p>
            </div>
        </div>
    </div>
    <div class="flex items-center bg-amber-200">
        {#if switchState === "streaks"}
            {#if station.hotStreak > 0}
            <p>{station.hotStreak}</p>
            {:else if station.coldStreak > 0}
            <p>{station.coldStreak}</p>
            {:else}
            <p>0</p>
            {/if}
        {:else}
        <p>{station.stars}</p>
        {/if}
    </div>
</div>
