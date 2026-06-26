import { getAllStations } from "@goldstarboard/api/stations/queries";
import { getAllStats } from "@goldstarboard/api/stats/queries";
import { getDailyData, sendDailyData } from "@tasks/daily-data";
import { getAllHourlyData, sendHourlyData } from "@tasks/hourly-data";
import { updateStats } from "@tasks/stats";

const stations = await getAllStations();
const stats = await getAllStats();

// Hourly job
Bun.cron("@hourly", async () => {
  await sendHourlyData(await getAllHourlyData(stations));
});

// Daily job
Bun.cron("50 18 * * *", async () => {
  await sendDailyData(await getDailyData(stations));
});

// Stats job
Bun.cron("55 18 * * *", async () => {
  await updateStats(stats);
});
