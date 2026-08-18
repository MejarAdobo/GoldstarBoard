<script lang="ts">
  import HourlyDataContainer from "$lib/components/station/HourlyDataContainer.svelte";

  import type { StationData } from "@goldstarboard/shared-types/interfaces";

  let { data }: { data: StationData } = $props();

  let { station, stats, hourly, daily } = $derived(data);
</script>

<svelte:head>
  <title>Station | {station.wuId}</title>
</svelte:head>

<div class="p-3 lg:px-8 lg:py-6">
  <div class="flex flex-col gap-1 lg:gap-4">
    <h2 class="text-text text-2xl font-semibold lg:text-4xl">
      {station.wuId}
    </h2>
    <HourlyDataContainer hourlyData={hourly} />
  </div>
</div>
