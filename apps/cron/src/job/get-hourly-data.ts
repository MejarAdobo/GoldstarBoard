import type { Station } from "@goldstarboard/shared-types/interfaces";
import { fetchData } from "./../fetch/fetch-data";

export const getAllHourlyData = async (stations: Station[]) => {
  const hourlyData = [];
  stations.forEach(async (station: Station) => {
    const data = await fetchData(station.wuId);
    hourlyData.push(data);
  });
};

// Todo: filter the hourly data to only get the needed one
// Todo: make a helper that convert metric to imperial
