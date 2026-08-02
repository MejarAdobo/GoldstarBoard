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
  )} my-2 flex w-full justify-between gap-2 rounded-lg bg-rank-primary p-2 lg:my-3 lg:p-4"
>
  <div class="flex items-center justify-between gap-1.5 lg:gap-4">
    <!-- Ranking -->
    <div class="flex items-center rounded-xl bg-rank-secondary px-3.5 py-2 lg:px-5.5 lg:py-4">
      <p class="text-2xl font-bold text-rank-text lg:text-4xl">{station.ranking}</p>
    </div>
    <!-- Station Name -->
    <div class="flex flex-col">
      <h2 class="text-base font-bold text-rank-text lg:text-2xl">{station.name}</h2>
      <div class="flex items-center gap-1.5">
        <IconCircleFilled size={12} class={hourlyData.status ? "text-[#0AE448]" : "text-[#F25570]"} />
        <p class="lg:text-md font text-xs text-rank-text">{hourlyData.status ? "Online" : "Offline"}</p>
      </div>
    </div>
  </div>
  <div class="my-1 flex flex-col gap-1 rounded-[.67em] bg-rank-secondary px-1.25 py-3 lg:my-2 lg:p-4">
    {#if switchState === "streaks"}
      {#if station.hotStreak > 0}
        <div class="flex min-w-24 items-center gap-1.5 pl-0.75 lg:min-w-28 lg:pl-0">
          <Flame class="h-6 w-6 shrink-0 text-amber-500 lg:h-8 lg:w-8" />
          <div class="tabular-nums">
            <p class="text-sm font-semibold text-rank-text lg:text-lg">{station.hotStreak} Days</p>
            <p class="text-xs font-semibold text-rank-muted-text lg:text-sm">Streak</p>
          </div>
        </div>
      {:else if station.coldStreak > 0}
        <div class="flex min-w-24 items-center gap-1.5 pl-0.75 lg:min-w-28 lg:pl-0">
          <Snowflake class="h-6 w-6 shrink-0 text-sky-500 lg:h-8 lg:w-8" />
          <div class="tabular-nums">
            <p class="text-sm font-semibold text-rank-text lg:text-lg">{station.coldStreak} Days</p>
            <p class="text-xs font-semibold text-rank-muted-text lg:text-sm">Streak</p>
          </div>
        </div>
      {:else}
        <p class="text-lg font-semibold text-rank-text">No Streak</p>
      {/if}
    {:else}
      <div class="flex items-center gap-1.5 pl-0.75 lg:min-w-28 lg:pl-0">
        <Star class="h-6 w-6 text-yellow-500 lg:h-8 lg:w-8" />
        <div>
          <p class="text-sm font-semibold text-rank-text lg:text-lg">{station.stars}</p>
          <p class="text-xs font-semibold text-rank-muted-text lg:text-sm">Stars</p>
        </div>
      </div>
    {/if}
  </div>
</div>
