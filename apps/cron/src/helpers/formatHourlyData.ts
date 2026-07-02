import type { Observation } from "@goldstarboard/shared-types/interfaces";

export const formatHourlyData = (metric_data: Observation, imperial_data: Observation) => {
  const metric = {
    temp: metric_data.metric?.temp ?? null,
    dew: metric_data.metric?.dewpt ?? null,
    windChill: metric_data.metric?.windChill ?? null,
    windSpeed: metric_data.metric?.windSpeed ?? null,
    windGust: metric_data.metric?.windGust ?? null,
    windDir: metric_data.winddir ?? null,
    pressure: metric_data.metric?.pressure ?? null,
    precipRate: metric_data.metric?.precipRate ?? null,
    precipAccum: metric_data.metric?.precipTotal ?? null,
    humidity: metric_data.humidity ?? null,
  };
  const imperial = {
    temp: imperial_data.imperial?.temp ?? null,
    dew: imperial_data.imperial?.dewpt ?? null,
    windChill: imperial_data.imperial?.windChill ?? null,
    windSpeed: imperial_data.imperial?.windSpeed ?? null,
    windGust: imperial_data.imperial?.windGust ?? null,
    windDir: imperial_data.winddir ?? null,
    pressure: imperial_data.imperial?.pressure ?? null,
    precipRate: imperial_data.imperial?.precipRate ?? null,
    precipAccum: imperial_data.imperial?.precipTotal ?? null,
    humidity: imperial_data.humidity ?? null,
  };

  return { metric, imperial };
};
