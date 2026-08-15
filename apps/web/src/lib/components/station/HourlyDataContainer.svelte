<script lang="ts">
  let { hourlyData } = $props();
  const metricData = $derived(hourlyData[0]?.metricData);
  const imperialData = $derived(hourlyData[0]?.imperialData);
  import { Cloud } from "@lucide/svelte";
  import WeatherWidget from "./WeatherWidget.svelte";

  // Note: Add this line into a setting or a switch
  let unitMeasurement = "metric";

  const weatherData = $derived(unitMeasurement === "imperial" ? imperialData : metricData);
  let lastUpdate = $derived(hourlyData[0]?.updatedAt);
  const hour = $derived(lastUpdate?.split(" ")[1].split(":")[0]);
</script>

<div class="bg-primary mt-4 rounded-[.67em] p-6">
  <div class="flex gap-2">
    <Cloud class="text-text h-8 w-8 items-center" />
    <h2 class="text-md mb-2 font-bold sm:text-xl lg:text-2xl">Weather Conditions</h2>
  </div>
  <p class="text-text text-lg mb-3">Last Update: {hour}:00 UTC</p>
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
