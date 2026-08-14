<script lang="ts">
    let { data } = $props();

    let { station, stats, hourly } = $derived(data);
</script>

<h1>{station.wuId}</h1>
