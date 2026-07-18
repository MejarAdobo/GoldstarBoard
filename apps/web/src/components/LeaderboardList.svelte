<script lang="ts">
  import LeaderboardCard from "./LeaderboardCard.svelte";

  import type { HourlyData } from "@goldstarboard/shared-types/interfaces";

  let { streakData, starData, hourlyData, switchState } = $props();

  const getStationHourlyData = (id: string) => hourlyData.find((s: HourlyData) => s.stationId === id);
</script>

<div>
  {#if switchState === "streaks"}
    {#each streakData as station}
      <LeaderboardCard {station} {switchState} hourlyData={getStationHourlyData(station.wuId)} />
    {/each}
  {:else}
    {#each starData as station}
      <LeaderboardCard {station} {switchState} hourlyData={getStationHourlyData(station.wuId)} />
    {/each}
  {/if}
</div>
