<script lang="ts">
  import { Flame, Snowflake, Star } from "@lucide/svelte";
  import { IconCircleFilled } from "@tabler/icons-svelte";

  let { station, hourlyData, switchState } = $props();

  const getRankColour = (rank: number) => {
    switch (rank) {
      case 1:
        return "rank-gold";
      case 2:
        return "rank-silver";
      case 3:
        return "rank-bronze";
      default:
        return "";
    }
  };
</script>

<div
  class="{getRankColour(
    station.ranking,
  )} my-3 flex w-full justify-between gap-2 rounded-lg bg-container-background p-4 shadow-md"
>
  <div class="flex items-center justify-between gap-4">
    <!-- Ranking -->
    <div class="flex items-center rounded-xl bg-badge px-5.5 py-4">
      <p class="text-4xl font-bold text-badge-text">{station.ranking}</p>
    </div>
    <!-- Station Name -->
    <div class="flex flex-col">
      <h2 class="text-2xl font-bold text-container-text">{station.name}</h2>
      <div class="flex items-center gap-2">
        <IconCircleFilled size={15} class={hourlyData.status ? "text-green-800" : "text-red-600"} />
        <p class="text-md text-stats-text">{hourlyData.status ? "Online" : "Offline"}</p>
      </div>
    </div>
  </div>
  <div class="my-2 flex flex-col gap-1 rounded-xl bg-stats-background px-3 py-2">
    <h3 class="text-xl font-semibold text-stats-text">{switchState === "streaks" ? "Streak" : "Stars"}</h3>
    {#if switchState === "streaks"}
      {#if station.hotStreak > 0}
        <div class="flex items-center gap-2">
          <Flame size={24} class="text-amber-500" />
          <p class="text-lg font-semibold text-stats-text">{station.hotStreak}</p>
        </div>
      {:else if station.coldStreak > 0}
        <div class="flex items-center gap-2">
          <Snowflake size={24} class="text-sky-500" />
          <p class="text-lg font-semibold text-stats-text">{station.coldStreak}</p>
        </div>
      {:else}
        <p class="text-lg font-semibold text-stats-text">0</p>
      {/if}
    {:else}
      <div class="flex items-center gap-2">
        <Star size={24} class="text-yellow-500" />
        <p class="text-lg font-semibold text-stats-text">{station.stars}</p>
      </div>
    {/if}
  </div>
</div>
