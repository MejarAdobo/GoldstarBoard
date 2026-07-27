<script lang="ts">
  import LeaderboardList from "./LeaderboardList.svelte";
  import LeaderboardSwitch from "./LeaderboardSwitch.svelte";

  let { streakData, starData, hourlyData } = $props();
  let switchState = $state("streaks");
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-4 py-4">
  <div class="flex justify-between">
    <h2 class="text-4xl font-semibold text-text">{switchState === "streaks" ? "Streaks" : "Stars"}</h2>
    <LeaderboardSwitch bind:value={switchState} />
  </div>
  <div>
    <LeaderboardList {switchState} {streakData} {starData} {hourlyData} />
  </div>
</div>

<!-- Plan: Header = Contain the Title (Streak, Most Star), and a switch to see either streak or star ranking, and last updated -->
<!-- Plan: Body = Contain a list of station displaying the relevant stats -->
<!-- Plan: Footer = Nothing just empty space -->
<!-- Plan: When fetching data, display a loading indicator -->
<!-- Plan: When data is loaded, display the leaderboard -->
<!-- Plan: When data is not loaded, display an error message -->
