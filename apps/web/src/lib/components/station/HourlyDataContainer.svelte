<script lang="ts">
  import UnitSwitch from "./UnitSwitch.svelte";
  import WeatherWidget from "./WeatherWidget.svelte";
  let { hourlyData } = $props();
  const metricData = $derived(hourlyData[0]?.metricData);
  const imperialData = $derived(hourlyData[0]?.imperialData);
  let unitMeasurement = $state("metric");

  const weatherData = $derived(unitMeasurement === "imperial" ? imperialData : metricData);
</script>

<div class="bg-primary mt-4 rounded-[.67em] p-6">
  <div class="mb-3 flex items-center justify-between gap-2">
    <h2 class="text-md font-bold sm:text-xl lg:text-2xl">Weather Conditions</h2>
    <UnitSwitch bind:value={unitMeasurement} />
  </div>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
    {#if weatherData}
      <WeatherWidget
        title="Temp"
        value={`${weatherData.temp}`}
        unit={unitMeasurement === "imperial" ? "°F" : "°C"}
      />
      <WeatherWidget title="Humidity" value={`${weatherData.humidity}`} unit="%" />
      <WeatherWidget
        title="Dew Point"
        value={`${weatherData.dew}`}
        unit={unitMeasurement === "imperial" ? "°F" : "°C"}
      />
      <WeatherWidget
        title="Precip Rate"
        value={`${weatherData.precipRate}`}
        unit={unitMeasurement === "imperial" ? "in" : "mm"}
      />
      <WeatherWidget
        title="Precip Total"
        value={`${weatherData.precipAccum}`}
        unit={unitMeasurement === "imperial" ? "in" : "mm"}
      />
      <WeatherWidget title="Wind Direction" value={`${weatherData.windDir}`} unit="°" />
      <WeatherWidget
        title="Wind Speed"
        value={`${weatherData.windSpeed}`}
        unit={unitMeasurement === "imperial" ? "mph" : "m/s"}
      />
      <WeatherWidget
        title="Wind Gust"
        value={`${weatherData.windGust}`}
        unit={unitMeasurement === "imperial" ? "mph" : "m/s"}
      />
      <WeatherWidget
        title="Wind Chill"
        value={`${weatherData.windChill}`}
        unit={unitMeasurement === "imperial" ? "°F" : "°C"}
      />
      <WeatherWidget
        title="Pressure"
        value={`${weatherData.pressure}`}
        unit={unitMeasurement === "imperial" ? "in" : " hPa"}
      />
    {/if}
  </div>
</div>
