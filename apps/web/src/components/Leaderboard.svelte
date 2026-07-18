<script lang="ts">
  import { onMount } from "svelte";
  import LeaderboardList from "./LeaderboardList.svelte";
  import LeaderboardSwitch from "./LeaderboardSwitch.svelte";

  let streakData = $state([]);
  let starData = $state([]);
  let hourlyData = $state([]);
  let switchState = $state("streaks");

  const fetchAPI = async (url: string) => {
    try {
      const resp = await fetch(url);
      return await resp.json();
    } catch (error) {
      console.error("Fetch failed:", error);
      return [];
    }
  };

  onMount(async () => {
    const apiUrl = import.meta.env["PUBLIC_API_URL"];
    const [streakResp, starResp, hourlyResp] = await Promise.all([
      fetchAPI(`${apiUrl}/streak-ranking`),
      fetchAPI(`${apiUrl}/star-ranking`),
      fetchAPI(`${apiUrl}/hourly-data`),
    ]);
    streakData = streakResp || [];
    starData = starResp || [];
    hourlyData = hourlyResp || [];
  });
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
