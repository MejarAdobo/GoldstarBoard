<script lang="ts">
    import LeaderboardCard from './LeaderboardCard.svelte';

    let { streakData, starData, switchState } = $props();
</script>

<div class="">
    {#if switchState === 'streaks'}
        {#each streakData as station}
            <LeaderboardCard station={station} switchState={switchState} />
        {/each}
    {:else}
    {#each starData as station}
        <LeaderboardCard station={station} switchState={switchState} />
    {/each}
    {/if}
</div>
