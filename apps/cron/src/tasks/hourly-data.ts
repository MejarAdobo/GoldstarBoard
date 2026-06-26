import { fetchData } from "@fetch/fetch-data";
import { createHourlyData } from "@goldstarboard/api/hourly-data/mutations";
import { buildURL } from "@helpers/build-url";
import { formatHourlyData } from "@helpers/format-hourly-data";

import type { HourlyData, Station } from "@goldstarboard/shared-types/interfaces";

const PUBLIC_API_KEY = process.env["PUBLIC_API_KEY"]!;

export const getAllHourlyData = async (stations: Station[]) => {
  const hourlyData: HourlyData[] = [];

  const promises = stations.map(async (station: Station) => {
    const metricURL = buildURL(station.wuId, PUBLIC_API_KEY, "m");
    const imperialURL = buildURL(station.wuId, PUBLIC_API_KEY, "e");

    const metricData = await fetchData(metricURL);
    const imperialData = await fetchData(imperialURL);

    const [metricObservation, imperialObservation] = [
      metricData.observations[0],
      imperialData.observations[0],
    ];

    if (!metricObservation || !imperialObservation) {
      return;
    }

    const formattedData = formatHourlyData(metricObservation, imperialObservation);

    hourlyData.push({ station: station.wuId, ...formattedData });
  });

  await Promise.all(promises);

  return hourlyData;
};

export const sendHourlyData = async (hourlyData: HourlyData[]) => {
  hourlyData.forEach(async (data) => {
    await createHourlyData(data.station, data.metric, data.imperial);
  });
};
