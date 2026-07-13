<script lang="ts">
    import { Flame, Snowflake, Star } from '@lucide/svelte';
    import { IconCircleFilled } from '@tabler/icons-svelte';

    let { station, hourlyData, switchState } = $props();
</script>

<div class="bg-white shadow-md rounded-lg p-4 my-3 flex gap-2 w-full justify-between">
    <div class="flex justify-between items-center gap-4">
        <!-- Ranking -->
        <div class="flex items-center py-4 px-5.5 border-2 border-blue-300 rounded-xl">
            <p class="text-4xl font-bold text-black">{station.ranking}</p>
        </div>
        <!-- Station Name -->
        <div class="flex flex-col">
            <h2 class="text-2xl font-bold text-black">{station.name}</h2>
            <div class="flex items-center gap-2">
                <IconCircleFilled size={15} color={hourlyData.status ? "green" : "red"} />
                <p class="text-md text-black">{hourlyData.status ? "Online" : "Offline"}</p>
            </div>
        </div>
    </div>
    <div class="flex flex-col my-2 gap-1">
        <h3 class="text-xl font-semibold text-black">{switchState === "streaks" ? "Streak" : "Stars"}</h3>
        {#if switchState === "streaks"}
            {#if station.hotStreak > 0}
                <div class="flex items-center gap-2">
                    <Flame size={24} color="red" />
                    <p class="text-lg font-semibold">{station.hotStreak}</p>
                </div>
            {:else if station.coldStreak > 0}
                <div class="flex items-center gap-2">
                    <Snowflake size={24} color="blue" />
                    <p class="text-lg font-semibold">{station.coldStreak}</p>
                </div>
            {:else}
            <p class="text-lg font-semibold">0</p>
            {/if}
        {:else}
        <div class="flex items-center gap-2">
            <Star size={24} color="yellow" />
            <p class="text-lg font-semibold">{station.hotStreak}</p>
        </div>
        {/if}
    </div>
</div>
