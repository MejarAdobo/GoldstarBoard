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
  )} my-3 flex w-full justify-between gap-2 rounded-lg bg-rank-primary lg:p-4 p-2"
>
  <div class="flex items-center justify-between lg:gap-4 gap-3">
    <!-- Ranking -->
    <div class="flex items-center rounded-xl bg-rank-secondary lg:px-5.5 lg:py-4 px-3.5 py-2">
      <p class="text-3xl lg:text-4xl font-bold text-rank-text">{station.ranking}</p>
    </div>
    <!-- Station Name -->
    <div class="flex flex-col">
      <h2 class="text-xl lg:text-2xl font-bold text-rank-text">{station.name}</h2>
      <div class="flex items-center gap-1.5">
        <IconCircleFilled size={12} class={hourlyData.status ? "text-[#0AE448]" : "text-[#F25570]"} />
        <p class="text-sm lg:text-md font text-rank-text">{hourlyData.status ? "Online" : "Offline"}</p>
      </div>
    </div>
  </div>
  <div class="my-2 flex flex-col gap-1 rounded-[.67em] bg-rank-secondary p-3">
    {#if switchState === "streaks"}
      {#if station.hotStreak > 0}
        <div class="flex items-center gap-1.5">
          <Flame class="text-amber-500 w-6.5 h-6.5 lg:w-8 lg:h-8" />
          <div>
            <p class="text-md lg:text-lg font-semibold text-rank-text">{station.hotStreak} Days</p>
            <p class="text-sm font-semibold text-rank-muted-text">Streak</p>
          </div>
        </div>
      {:else if station.coldStreak > 0}
        <div class="flex items-center gap-1.5">
          <Snowflake class="text-sky-500 w-6.5 h-6.5 lg:w-8 lg:h-8" />
          <div>
            <p class="text-md lg:text-lg font-semibold text-rank-text">{station.coldStreak} Days</p>
            <p class="text-sm font-semibold text-rank-muted-text">Streak</p>
          </div>
        </div>
      {:else}
        <p class="text-lg font-semibold text-rank-text">No Streak</p>
      {/if}
    {:else}
      <div class="flex items-center gap-1.5">
        <Star class="text-yellow-500 w-6.5 h-6.5 lg:w-8 lg:h-8" />
        <div>
          <p class="text-md lg:text-lg  font-semibold text-rank-text">{station.stars}</p>
          <p class="text-sm font-semibold text-rank-muted-text">Stars</p>
        </div>
      </div>
    {/if}
  </div>
</div>
