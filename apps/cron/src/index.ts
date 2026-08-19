import { getAllHistoricalStats } from "@goldstarboard/db-services/historicalStat/queries";
import { getAllStats } from "@goldstarboard/db-services/stat/queries";
import { getAllStations } from "@goldstarboard/db-services/station/queries";
import { Temporal } from "@js-temporal/polyfill";
import { getDailyData, sendDailyData } from "@tasks/dailyData";
import {
  createNewHistoricalStats,
  updateHistoricStats,
} from "@tasks/historicStats";
import { getAllHourlyData, sendHourlyData } from "@tasks/hourlyData";
import { updateStats } from "@tasks/stats";

// Hourly job
Bun.cron("@hourly", async () => {
  const stations = await getAllStations();
  await sendHourlyData(await getAllHourlyData(stations));
});

// Daily job
// This run at 6 in the morning at UTC, and run at near midnight in Pacific Time Zone
Bun.cron("50 6 * * *", async () => {
  const stations = await getAllStations();
  await sendDailyData(await getDailyData(stations));
});

// Stats job
// This run at 6 in the morning at UTC, and run at near midnight in Pacific Time Zone
Bun.cron("55 6 * * *", async () => {
  const stats = await getAllStats();
  await updateStats(stats);
});

// Historical Stats job
// This run at 6 in the morning at UTC, and run at near midnight in Pacific Time Zone
Bun.cron("58 6 * * *", async () => {
  const currentYear = Temporal.Now.plainDateISO().year;
  const histStats = await getAllHistoricalStats();
  const filteredStats = histStats.filter((s) => s.year === currentYear);
  const stats = await getAllStats();
  await updateHistoricStats(filteredStats, stats);
});

// Historical Stats job
// This create a new historical stats entry for each station every year
Bun.cron("0 1 1 1 *", async () => {
  const stations = await getAllStations();
  await createNewHistoricalStats(stations);
});
