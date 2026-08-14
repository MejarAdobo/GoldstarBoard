<script lang="ts">
  import LeaderboardList from "$lib/components/leaderboard/LeaderboardList.svelte";
  import LeaderboardSwitch from "$lib/components/leaderboard/LeaderboardSwitch.svelte";

  import type { LeaderboardData } from "@goldstarboard/shared-types/interfaces";

  let { data }: { data: LeaderboardData } = $props();
  let switchState = $state("streaks");

  let lastUpdate = $derived(data.hourlyData[0]?.updatedAt);
  let dateOnly = $derived(lastUpdate?.split(" ")[0]);
</script>

<svelte:head>
  <title>Leaderboard</title>
</svelte:head>

<div class="p-3 lg:px-8 lg:py-6">
  <div class="flex flex-col gap-1 lg:gap-4">
    <div class="flex items-center justify-between">
    <div class="flex flex-col">
        <h2 class="text-text text-2xl font-semibold lg:text-4xl">
          {switchState === "streaks" ? "Streaks" : "Stars"}
        </h2>
        <p class="text-text text-base font-medium lg:text-lg">Last Updated: {dateOnly} UTC</p>
    </div>
      <LeaderboardSwitch bind:value={switchState} />
    </div>
    <div>
      <LeaderboardList
        streakData={data.streakData}
        starData={data.starData}
        hourlyData={data.hourlyData}
        {switchState}
      />
    </div>
  </div>
</div>

<!-- Plan: When fetching data, display a loading indicator -->
<!-- Plan: When data is loaded, display the leaderboard -->
<!-- Plan: When data is not loaded, display an error message -->
