<script lang="ts">
    import type { HourlyData } from '@goldstarboard/shared-types/interfaces';
    import LeaderboardCard from './LeaderboardCard.svelte';

    let { streakData, starData, hourlyData, switchState } = $props();

    const getStationHourlyData = (id: string) => hourlyData.find((s: HourlyData) => s.stationId === id);
</script>

<div>
    {#if switchState === 'streaks'}
        {#each streakData as station}
            <LeaderboardCard station={station} switchState={switchState} hourlyData={getStationHourlyData(station.wuId)} />
        {/each}
    {:else}
    {#each starData as station}
        <LeaderboardCard station={station} switchState={switchState} hourlyData={getStationHourlyData(station.wuId)} />
    {/each}
    {/if}
</div>
