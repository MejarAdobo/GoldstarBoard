<script lang="ts">
    import LeaderboardCard from './LeaderboardCard.svelte';

    let { streakData, starData, switchState } = $props();
</script>

<div>
    {#if switchState === 'streaks'}
        {#each streakData as station}
            <LeaderboardCard station={station} />
        {/each}
    {:else}
    {#each starData as station}
        <LeaderboardCard station={station} />
    {/each}
    {/if}
</div>
