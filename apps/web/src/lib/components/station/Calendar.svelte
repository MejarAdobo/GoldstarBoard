<script lang="ts">
  let dailyData = $props();
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { ChevronLeft, ChevronRight } from "@lucide/svelte";
  import { Calendar } from "bits-ui";

  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar.Root
  class="bg-primary mt-6 rounded-[.67em] p-5.5 border-none"
  weekdayFormat="short"
  fixedWeeks={true}
  type="single"
  bind:value
>
  {#snippet children({ months, weekdays })}
    <Calendar.Header class="flex items-center justify-between">
      <Calendar.PrevButton
        class="rounded-[.67em] hover:bg-secondary inline-flex size-10 items-center justify-center active:scale-[0.98] active:transition-all"
      >
        <ChevronLeft class="size-6" />
      </Calendar.PrevButton>
      <Calendar.Heading class="text-[15px] font-medium" />
      <Calendar.NextButton
        class="rounded-[.67em] hover:bg-secondary inline-flex size-10 items-center justify-center active:scale-[0.98] active:transition-all"
      >
        <ChevronRight class="size-6" />
      </Calendar.NextButton>
    </Calendar.Header>
    <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      {#each months as month, i (i)}
        <Calendar.Grid class="w-full space-y-1 select-none">
          <Calendar.GridHead>
            <Calendar.GridRow class="mb-1 flex w-full justify-between">
              {#each weekdays as day, i (i)}
                <Calendar.HeadCell class="text-text/70 w-10 rounded-md text-xs font-normal!">
                  <div>{day.slice(0, 2)}</div>
                </Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody>
            {#each month.weeks as weekDates, i (i)}
              <Calendar.GridRow class="flex w-full">
                {#each weekDates as date, i (i)}
                  <Calendar.Cell {date} month={month.value} class="relative size-10 p-0! text-center text-sm">
                    <Calendar.Day
                      class="rounded-[.67em] text-text data-selected:bg-secondary/75 data-disabled:text-muted-text data-selected:text-background data-unavailable:text-green-400 group relative inline-flex size-10 items-center justify-center p-0 text-sm font-normal whitespace-nowrap data-disabled:pointer-events-none data-outside-month:pointer-events-none data-selected:font-medium data-unavailable:line-through"
                    >
                      {date.day}
                    </Calendar.Day>
                  </Calendar.Cell>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      {/each}
    </div>
  {/snippet}
</Calendar.Root>
