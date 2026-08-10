<script lang="ts">
  import LeaderboardList from "$lib/components/leaderboard/LeaderboardList.svelte";
  import LeaderboardSwitch from "$lib/components/leaderboard/LeaderboardSwitch.svelte";

  import type { PageData } from "@goldstarboard/shared-types/interfaces";

  let { data }: { data: PageData } = $props();
  let switchState = $state("streaks");
</script>

<svelte:head>
  <title>Leaderboard</title>
</svelte:head>

<div class="p-3 lg:px-8 lg:py-6">
  <div class="flex flex-col gap-1 lg:gap-4">
    <div class="flex items-center justify-between">
      <h2 class="text-text text-2xl font-semibold lg:text-4xl">
        {switchState === "streaks" ? "Streaks" : "Stars"}
      </h2>
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

<!-- Plan: Header = Contain the Title (Streak, Most Star), and a switch to see either streak or star ranking, and last updated -->
<!-- Plan: Body = Contain a list of station displaying the relevant stats -->
<!-- Plan: Footer = Nothing just empty space -->
<!-- Plan: When fetching data, display a loading indicator -->
<!-- Plan: When data is loaded, display the leaderboard -->
<!-- Plan: When data is not loaded, display an error message -->
