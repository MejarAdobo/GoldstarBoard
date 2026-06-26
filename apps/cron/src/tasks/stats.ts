import { updateStats as updtStats } from "@goldstarboard/api/stats/mutations";
import { getYesterdayData } from "@helpers/get-yesterday";
import { Temporal } from "@js-temporal/polyfill";

import type { Stats } from "@goldstarboard/shared-types/interfaces";

export const updateStats = async (stats: Stats[]) => {
  await Promise.all(
    stats.map(async (stat) => {
      const yesterdayData = await getYesterdayData(stat.stationId);
      let { star, hotStreak, coldStreak, lastDaySinceStar } = stat;

      if (yesterdayData?.starStatus == "gain" || yesterdayData?.starStatus == "maintain") {
        star += 1;
        hotStreak += 1;
        coldStreak = 0;
      } else if (yesterdayData?.starStatus == "loss" || yesterdayData?.starStatus == "none") {
        coldStreak += 1;
        hotStreak = 0;

        if (yesterdayData?.starStatus == "loss" && yesterdayData.createdAt) {
          const instant = Temporal.Instant.fromEpochMilliseconds(yesterdayData.createdAt.getTime());

          lastDaySinceStar = instant.toZonedDateTimeISO("UTC").toPlainDate().toString();
        }
      }

      await updtStats(stat.stationId, star, hotStreak, coldStreak, lastDaySinceStar);
    }),
  );
};
