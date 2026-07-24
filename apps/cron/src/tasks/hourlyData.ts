import { fetchData } from "@fetch/fetchData";
import { updateHourlyData } from "@goldstarboard/db-services/hourlyData/mutations";
import { buildURL } from "@helpers/buildUrl";
import { formatHourlyData } from "@helpers/formatHourlyData";
import { parseHTML } from "@parsers/parseHtml";

import type { HourlyData, Station } from "@goldstarboard/shared-types/interfaces";

export const getHourlyData = async (wuId: string) => {
  const PUBLIC_API_KEY = Bun.env["PUBLIC_API_KEY"]!;
  const URL = Bun.env["PWS_URL"]!;
  const stationURL = `${URL}${wuId}`;

  const metricURL = buildURL(wuId, PUBLIC_API_KEY, "m");
  const imperialURL = buildURL(wuId, PUBLIC_API_KEY, "e");

  const metricData = await fetchData(metricURL);
  const imperialData = await fetchData(imperialURL);

  const stationHTML = await fetchData(stationURL);
  const { stationOnline } = parseHTML(stationHTML);

  const metricObservations = metricData?.observations ?? [];
  const imperialObservations = imperialData?.observations ?? [];

  if (metricObservations.length === 0 || imperialObservations.length === 0) {
    console.warn(`[Task] Skipping station ${wuId} - No active observations found.`);
    return undefined;
  }

  const [metricObservation] = metricObservations;
  const [imperialObservation] = imperialObservations;

  const formattedData = formatHourlyData(metricObservation, imperialObservation);
  return { formattedData, status: stationOnline };
};

export const getAllHourlyData = async (stations: Station[]) => {
  const hourlyData: HourlyData[] = [];

  console.log(`
  =======================================================
   Fetching hourly data for ${stations.length} stations =
   Time (UTC):       ${new Date().toLocaleTimeString("en-GB", { timeZone: "UTC", timeStyle: "short" })}
   Time (Vancouver): ${new Date().toLocaleTimeString("en-GB", { timeZone: "America/Vancouver", timeStyle: "short" })}
  =======================================================
  \n
  `);

  const promises = stations.map(async (station: Station) => {
    const result = await getHourlyData(station.wuId);

    if (!result) {
      return;
    }

    const { formattedData, status } = result;

    hourlyData.push({ stationId: station.wuId, ...formattedData, status });
  });

  await Promise.all(promises);
  return hourlyData;
};

export const sendHourlyData = async (hourlyData: HourlyData[]) => {
  const promises = hourlyData.map(async (data) => {
    try {
      await updateHourlyData(data.stationId, data.metric, data.imperial, data.status);
      console.log(`
      ====================================================
        Created daily data for station ${data.stationId}
      ====================================================
        Metric:
        ${JSON.stringify(data.metric, null, 4)}

          Imperial:
        ${JSON.stringify(data.imperial, null, 4)}

        Status: ${data.status}
      ====================================================
      \n
      `);
    } catch (error) {
      console.error(`\nDB Update Failed for Station: ${data.stationId}`, {
        stationId: data.stationId,
        error: error instanceof Error ? error.message : error,
        payload: data,
        rawError: error,
        timestamp: new Date().toLocaleString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
    }
  });

  await Promise.all(promises);
};
