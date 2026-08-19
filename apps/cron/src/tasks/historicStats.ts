import { updateHistoricalStats } from "@goldstarboard/db-services/historicalStat/mutations";

import type { HistStats, Stats } from "@goldstarboard/shared-types/interfaces";

export const updateHistoricStats = async (
  histStats: HistStats[],
  stats: Stats[],
) => {
  await Promise.all(
    histStats.map(async (hs) => {
      const stat = stats.find((s) => s.stationId === hs.stationId);

      if (stat) {
        const star = hs.star < stat.star ? hs.star : stat.star;
        const hotStreak =
          hs.hotStreak < stat.hotStreak ? hs.hotStreak : stat.hotStreak;
        const coldStreak =
          hs.coldStreak < stat.coldStreak ? hs.coldStreak : stat.coldStreak;

        await updateHistoricalStats(
          hs.stationId,
          hs.year,
          star,
          hotStreak,
          coldStreak,
        );
      }
    }),
  );
};
