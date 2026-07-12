<script lang="ts">
    import { onMount } from 'svelte';
    import LeaderboardList from './LeaderboardList.svelte';
    import LeaderboardSwitch from './LeaderboardSwitch.svelte';

    let streakData = $state([]);
    let starData = $state([]);
    let hourlyData = $state([]);
    let switchState = $state("streaks");

    const fetchAPI = async (url: string) => {
      try {
        const resp = await fetch(url)
        return await resp.json()
      } catch (error) {
        console.error("Fetch failed:", error);
        return [];
      }
    }

    onMount(async () => {
        const apiUrl = import.meta.env["PUBLIC_API_URL"]
        const [streakResp, starResp, hourlyResp] = await Promise.all([
                    fetchAPI(`${apiUrl}/streak-ranking`),
                    fetchAPI(`${apiUrl}/star-ranking`),
                    fetchAPI(`${apiUrl}/hourly-data`)
        ]);
        streakData = streakResp || [];
        starData = starResp || [];
        hourlyData = hourlyResp || [];
    });

    </script>

<div class="max-w-4xl mx-auto py-4 rounded-2xl bg-red-300 flex flex-col gap-4">
    <div class="mx-4">
        <LeaderboardSwitch bind:value={switchState} />
    </div>
    <div class="mx-4">
        <LeaderboardList switchState={switchState} streakData={streakData} starData={starData} hourlyData={hourlyData} />
    </div>
</div>

<!-- Plan: Header = Contain the Title (Streak, Most Star), and a switch to see either streak or star ranking, and last updated -->
<!-- Plan: Body = Contain a list of station displaying the relevant stats -->
<!-- Plan: Footer = Nothing just empty space -->
<!-- Plan: When fetching data, display a loading indicator -->
<!-- Plan: When data is loaded, display the leaderboard -->
<!-- Plan: When data is not loaded, display an error message -->
