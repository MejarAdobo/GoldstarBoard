<script lang="ts">
  import LeaderboardCard from "./LeaderboardCard.svelte";

  import type { HourlyData } from "@goldstarboard/shared-types/interfaces";

  let { streakData, starData, hourlyData, switchState } = $props();

  const getStationHourlyData = (id: string) => hourlyData.find((s: HourlyData) => s.stationId === id);
</script>

<div>
    {#if streakData.length === 0 && starData.length === 0}
        <p class="font-semibold lg:text-5xl text-xl text-center py-10">No Station in the leaderboard</p>
    {:else}
        {#if switchState === "streaks"}
            {#each streakData as station}
                <LeaderboardCard {station} {switchState} hourlyData={getStationHourlyData(station.wuId)} />
            {/each}
        {:else}
            {#each starData as station}
                <LeaderboardCard {station} {switchState} hourlyData={getStationHourlyData(station.wuId)} />
            {/each}
        {/if}
    {/if}
  </div>
