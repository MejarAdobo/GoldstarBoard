<script lang="ts">
  import { Flame, Snowflake, Star } from "@lucide/svelte";
  import { IconCircleFilled } from "@tabler/icons-svelte";

  let { station, hourlyData, switchState } = $props();

  const getRankColour = (rank: number) => {
    switch (rank) {
      case 1: {
        return "rank-gold";
      }
      case 2: {
        return "rank-silver";
      }
      case 3: {
        return "rank-bronze";
      }
      default: {
        return "";
      }
    }
  };
</script>

<div
  class="{getRankColour(
    station.ranking,
  )} my-3 flex w-full justify-between gap-2 rounded-lg bg-rank-primary p-4"
>
  <div class="flex items-center justify-between gap-4">
    <!-- Ranking -->
    <div class="flex items-center rounded-xl bg-rank-secondary px-5.5 py-4">
      <p class="text-4xl font-bold text-rank-text">{station.ranking}</p>
    </div>
    <!-- Station Name -->
    <div class="flex flex-col">
      <h2 class="text-2xl font-bold text-rank-text">{station.name}</h2>
      <div class="flex items-center gap-2">
        <IconCircleFilled size={15} class={hourlyData.status ? "text-[#0AE448]" : "text-[#F25570]"} />
        <p class="text-md font text-rank-text">{hourlyData.status ? "Online" : "Offline"}</p>
      </div>
    </div>
  </div>
  <div class="my-2 flex flex-col gap-1 rounded-xl bg-rank-secondary p-3">
    {#if switchState === "streaks"}
      {#if station.hotStreak > 0}
        <div class="flex items-center gap-1.5">
          <Flame size={32} class="text-amber-500" />
          <div>
            <p class="text-lg font-semibold text-rank-text">{station.hotStreak} Days</p>
            <p class="text-sm font-semibold text-rank-muted-text">Streak</p>
          </div>
        </div>
      {:else if station.coldStreak > 0}
        <div class="flex items-center gap-1.5">
          <Snowflake size={32} class="text-sky-500" />
          <div>
            <p class="text-lg font-semibold text-rank-text">{station.coldStreak} Days</p>
            <p class="text-sm font-semibold text-rank-muted-text">Streak</p>
          </div>
        </div>
      {:else}
        <p class="text-lg font-semibold text-rank-text">No Streak</p>
      {/if}
    {:else}
      <div class="flex items-center gap-1.5">
        <Star size={32} class="text-yellow-500" />
        <div>
          <p class="text-lg font-semibold text-rank-text">{station.stars}</p>
          <p class="text-sm font-semibold text-rank-muted-text">Stars</p>
        </div>
      </div>
    {/if}
  </div>
</div>
