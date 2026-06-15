import {
  gatherHourlyData,
  gatherDailyData,
  updateStationsStreak,
  updateStationsGoldStar,
  deleteOldHourlyData,
} from "./jobs/index";

Bun.cron("@hourly", gatherHourlyData);
Bun.cron("@midnight", deleteOldHourlyData);
Bun.cron("50 23 * * * ", gatherDailyData);
Bun.cron("55 23 * * * ", updateStationsStreak);
Bun.cron("55 23 * * * ", updateStationsGoldStar);
