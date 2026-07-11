<script lang="ts">
    import LeaderboardSwitch from './LeaderboardSwitch.svelte'

    const fetchAPI = async (url: string) => {
      try {
        const resp = await fetch(url)
        return await resp.json()
      } catch (error) {
        console.error(error)
        return null
      }
    }

    const apiUrl = import.meta.env["PUBLIC_API_URL"]
    console.log(apiUrl)
    const streakResp = await fetchAPI(`${apiUrl}/streak-ranking`)
    const starResp = await fetchAPI(`${apiUrl}/star-ranking`)
    const streakData = streakResp
    const starData = starResp

    let switchState = $state("streaks");
</script>

<div class="max-w-4xl mx-auto py-4 rounded-2xl bg-red-300">
    <div class="mx-4">
        <LeaderboardSwitch bind:value={switchState} />
        <p>{switchState}</p>
    </div>
</div>

<!-- Plan: Header = Contain the Title (Streak, Most Star), and a switch to see either streak or star ranking, and last updated -->
<!-- Plan: Body = Contain a list of station displaying the relevant stats -->
<!-- Plan: Footer = Nothing just empty space -->
<!-- Plan: When fetching data, display a loading indicator -->
<!-- Plan: When data is loaded, display the leaderboard -->
<!-- Plan: When data is not loaded, display an error message -->
