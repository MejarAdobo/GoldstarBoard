import { fetchData } from "@fetch/fetchData";
import { updateHourlyData } from "@goldstarboard/db-services/hourlyData/mutations";
import { buildURL } from "@helpers/buildUrl";
import { formatHourlyData } from "@helpers/formatHourlyData";

import type { HourlyData, Station } from "@goldstarboard/shared-types/interfaces";

const PUBLIC_API_KEY = process.env["PUBLIC_API_KEY"]!;

export const getHourlyData = async (wuId: string) => {
  const metricURL = buildURL(wuId, PUBLIC_API_KEY, "m");
  const imperialURL = buildURL(wuId, PUBLIC_API_KEY, "e");

  const metricData = await fetchData(metricURL);
  const imperialData = await fetchData(imperialURL);

  const metricObservations = metricData?.observations ?? [];
  const imperialObservations = imperialData?.observations ?? [];

  if (metricObservations.length === 0 || imperialObservations.length === 0) {
    console.warn(`[Task] Skipping station ${wuId} - No active observations found.`);
    return undefined;
  }

  const [metricObservation] = metricObservations;
  const [imperialObservation] = imperialObservations;

  const formattedData = formatHourlyData(metricObservation, imperialObservation);
  return formattedData;
};

export const getAllHourlyData = async (stations: Station[]) => {
  const hourlyData: HourlyData[] = [];

  const promises = stations.map(async (station: Station) => {
    const formattedData = await getHourlyData(station.wuId);

    if (formattedData) {
      hourlyData.push({ station: station.wuId, ...formattedData });
    }
  });

  await Promise.all(promises);
  return hourlyData;
};

export const sendHourlyData = async (hourlyData: HourlyData[]) => {
  const promises = hourlyData.map(async (data) => {
    try {
      await updateHourlyData(data.station, data.metric, data.imperial);
      console.log(`Updated hourly data for station ${data.station}`);
    } catch (dbError) {
      console.error(`Failed to update DB for station ${data.station}:`, dbError);
    }
  });

  await Promise.all(promises);
};
