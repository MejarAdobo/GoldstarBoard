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
  )} bg-rank-primary my-2 flex w-full justify-between gap-2 rounded-lg p-2 lg:my-3 lg:p-4"
>
  <div class="flex items-center justify-between gap-1.5 lg:gap-4">
    <!-- Ranking -->
    <div class="bg-rank-secondary flex items-center rounded-xl px-3.5 py-2 lg:px-5.5 lg:py-4">
      <p class="text-rank-text text-2xl font-bold lg:text-4xl">{station.ranking}</p>
    </div>
    <!-- Station Name -->
    <div class="flex flex-col">
      <a
        class="text-rank-text cursor-pointer text-base font-bold lg:text-2xl"
        href={`/station/${station.wuId}`}>{station.name}</a
      >
      <div class="flex items-center gap-1.5">
        <IconCircleFilled size={12} class={hourlyData.status ? "text-[#0AE448]" : "text-[#F25570]"} />
        <p class="font text-rank-text text-xs lg:text-base">{hourlyData.status ? "Online" : "Offline"}</p>
      </div>
    </div>
  </div>
  <div class="bg-rank-secondary my-1 flex flex-col gap-1 rounded-[.67em] px-1.25 py-3 lg:my-2 lg:p-4">
    {#if switchState === "streaks"}
      {#if station.hotStreak > 0}
        <div class="flex min-w-24 items-center gap-1.5 pl-0.75 lg:min-w-28 lg:pl-0">
          <Flame class="h-6 w-6 shrink-0 text-amber-500 lg:h-8 lg:w-8" />
          <div class="tabular-nums">
            <p class="text-rank-text text-sm font-semibold lg:text-lg">{station.hotStreak} Days</p>
            <p class="text-rank-muted-text text-xs font-semibold lg:text-sm">Streak</p>
          </div>
        </div>
      {:else if station.coldStreak > 0}
        <div class="flex min-w-24 items-center gap-1.5 pl-0.75 lg:min-w-28 lg:pl-0">
          <Snowflake class="h-6 w-6 shrink-0 text-sky-500 lg:h-8 lg:w-8" />
          <div class="tabular-nums">
            <p class="text-rank-text text-sm font-semibold lg:text-lg">{station.coldStreak} Days</p>
            <p class="text-rank-muted-text text-xs font-semibold lg:text-sm">Streak</p>
          </div>
        </div>
      {:else}
        <p class="text-rank-text text-lg font-semibold">No Streak</p>
      {/if}
    {:else}
      <div class="flex items-center gap-1.5 pl-0.75 lg:min-w-28 lg:pl-0">
        <Star class="h-6 w-6 text-yellow-500 lg:h-8 lg:w-8" />
        <div>
          <p class="text-rank-text text-sm font-semibold lg:text-lg">{station.stars}</p>
          <p class="text-rank-muted-text text-xs font-semibold lg:text-sm">Stars</p>
        </div>
      </div>
    {/if}
  </div>
</div>
