import { getAllStats } from "@goldstarboard/db-services/stat/queries";
import { getAllStations } from "@goldstarboard/db-services/station/queries";
import { getDailyData, sendDailyData } from "@tasks/dailyData";
import { getAllHourlyData, sendHourlyData } from "@tasks/hourlyData";
import { updateStats } from "@tasks/stats";

const stations = await getAllStations();
const stats = await getAllStats();

// Hourly job
Bun.cron("@hourly", async () => {
  await sendHourlyData(await getAllHourlyData(stations));
});

// Daily job
// This run at 6 in the morning at UTC, and run at near midnight in Pacific Time Zone
Bun.cron("50 6 * * *", async () => {
  await sendDailyData(await getDailyData(stations));
});

// Stats job
// This run at 6 in the morning at UTC, and run at near midnight in Pacific Time Zone
Bun.cron("55 6 * * *", async () => {
  await updateStats(stats);
});
