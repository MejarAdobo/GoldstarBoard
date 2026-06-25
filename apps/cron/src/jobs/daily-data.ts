import { fetchData } from "@fetch/fetch-data";
import { createDailyData } from "@goldstarboard/api/daily-data/mutations";
import { parseHTML } from "@parsers/parse-html";

import type { starStatusEnum } from "@goldstarboard/shared-types/enums";
import type { DailyData, Station } from "@goldstarboard/shared-types/interfaces";

export const getDailyData = async (stations: Station[]) => {
  const dailyData: DailyData[] = [];
  const URL = process.env["PWS_URL"]!;

  const promises = stations.map(async (station: Station) => {
    const stationURL = `${URL}${station.wuId}`;

    const stationHTML = await fetchData(stationURL);
    const haveGoldStar = parseHTML(stationHTML);

    const previousStatus = station.dailyData?.starStatus;
    let newStatus: starStatusEnum = "none";

    // Refactor in the future
    if (haveGoldStar) {
      if (previousStatus === "loss" || previousStatus === "none" || previousStatus == undefined) {
        newStatus = "gain";
      } else if (previousStatus === "gain" || previousStatus === "maintain") {
        newStatus = "maintain";
      }
    } else {
      if (previousStatus === "gain" || previousStatus === "maintain") {
        newStatus = "loss";
      } else if (previousStatus === "loss" || previousStatus === "none" || previousStatus == undefined) {
        newStatus = "none";
      }
    }

    dailyData.push({
      stationId: station.wuId,
      starStatus: newStatus,
    });
  });

  await Promise.all(promises);

  return dailyData;
};

export const sendDailyData = async (dailyData: DailyData[]) => {
  dailyData.forEach(async (data: DailyData) => {
    await createDailyData(data.stationId, data.starStatus);
  });
};
