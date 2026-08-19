import {
  createHistoricalStats,
  updateHistoricalStats,
} from "@goldstarboard/db-services/historicalStat/mutations";
import { Temporal } from "@js-temporal/polyfill";

import type { HistStats, Station, Stats } from "@goldstarboard/shared-types/interfaces";

export const updateHistoricStats = async (histStats: HistStats[], stats: Stats[]) => {
  await Promise.all(
    histStats.map(async (hs) => {
      const stat = stats.find((s) => s.stationId === hs.stationId);

      if (stat) {
        const star = hs.star < stat.star ? hs.star : stat.star;
        const hotStreak = hs.hotStreak < stat.hotStreak ? hs.hotStreak : stat.hotStreak;
        const coldStreak = hs.coldStreak < stat.coldStreak ? hs.coldStreak : stat.coldStreak;

        await updateHistoricalStats(hs.stationId, hs.year, star, hotStreak, coldStreak);
      }
    }),
  );
};

export const createNewHistoricalStats = async (stations: Station[]) => {
  await Promise.all(
    stations.map(async (station) => {
      const currentYear = Temporal.Now.plainDateISO().year;
      await createHistoricalStats(station.wuId, currentYear, 0, 0, 0);
    }),
  );
};
