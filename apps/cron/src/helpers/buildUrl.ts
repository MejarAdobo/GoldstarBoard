export const buildURL = (id: string, apiKey: string, unit: "m" | "e") => {
  const url = new URL("https://api.weather.com/v2/pws/observations/current");

  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("numericPrecision", "decimal");
  url.searchParams.set("format", "json");
  url.searchParams.set("stationId", id);
  url.searchParams.set("units", unit);

  return url.toString();
};
