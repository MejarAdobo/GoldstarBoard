import { fetchData } from "@fetch/fetchData";
import { createDailyData } from "@goldstarboard/db-services/dailyData/mutations";
import { getYesterdayData } from "@helpers/getYesterday";
import { parseHTML } from "@parsers/parseHtml";

import type { starStatusEnum } from "@goldstarboard/shared-types/enums";
import type { DailyData, Station } from "@goldstarboard/shared-types/interfaces";

export const getDailyData = async (stations: Station[]) => {
  const dailyData: DailyData[] = [];
  const URL = Bun.env["PWS_URL"]!;

  console.log(`
  =======================================================
    Fetching daily data for ${stations.length} stations
    Date: ${new Date().toLocaleDateString("en-CA")}
  =======================================================
  \n
  `);

  const promises = stations.map(async (station: Station) => {
    const stationURL = `${URL}${station.wuId}`;

    const stationHTML = await fetchData(stationURL);
    const { haveGoldStar } = parseHTML(stationHTML);

    const yesterdayData = await getYesterdayData(station.wuId);
    const previousStatus = yesterdayData?.starStatus;
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
  const promises = dailyData.map(async (data) => {
    try {
      await createDailyData(data.stationId, data.starStatus);

      console.log(`
      ====================================================
        Created daily data for station ${data.stationId}
      ====================================================
        Star Status: ${data.starStatus}
      ====================================================
      \n
      `)
    }
    catch (error) {
      console.error(`\nDB Create Failed for Station: ${data.stationId}`, {
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

  await Promise.all(promises)

};
