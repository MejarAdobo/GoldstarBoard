import { getDailyDataByStation } from "@goldstarboard/db-services/dailyData/queries";
import { updateStats as updtStats } from "@goldstarboard/db-services/stat/mutations";
import { getYesterdayData } from "@helpers/getYesterday";
import { Temporal } from "@js-temporal/polyfill";

import type { Stats } from "@goldstarboard/shared-types/interfaces";

export const updateStats = async (stats: Stats[]) => {
  await Promise.all(
    stats.map(async (stat) => {
      const yesterdayData = await getYesterdayData(stat.stationId);
      let { star, hotStreak, coldStreak, lastDaySinceStar } = stat;

      if (yesterdayData) {
        if (yesterdayData?.starStatus == "gain" || yesterdayData?.starStatus == "maintain") {
          star += 1;
          hotStreak += 1;
          coldStreak = 0;
        } else if (yesterdayData?.starStatus == "loss" || yesterdayData?.starStatus == "none") {
          coldStreak += 1;
          hotStreak = 0;

          if (yesterdayData?.starStatus == "loss" && yesterdayData.createdAt) {
            const instant = Temporal.Instant.from(yesterdayData.createdAt);
            lastDaySinceStar = instant.toZonedDateTimeISO("UTC").toPlainDate().toString();
          }
        }
      }
      // This is if the station is recently added and have no previous daily data
      else {
        const dailyData = await getDailyDataByStation(stat.stationId);
        const [recentDailyData] = dailyData.slice(-1);

        if (recentDailyData) {
          if (recentDailyData?.starStatus == "gain") {
            star += 1;
            hotStreak += 1;
          } else {
            coldStreak += 1;
          }
        }
      }

      await updtStats(stat.stationId, star, hotStreak, coldStreak, lastDaySinceStar);
    }),
  );
};
