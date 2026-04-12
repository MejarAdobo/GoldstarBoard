import { fetchDailyData } from "./api";

export async function loadDailyData() {
	const allDailyData = await fetchDailyData();
	const currentYear = new Date().getFullYear().toString();

	return allDailyData
		.filter((item) => item.recorded_at.startsWith(currentYear))
		.sort((a, b) => a.recorded_at.localeCompare(b.recorded_at))
		.reduce((acc, item) => {
			(acc[item.station] ??= []).push(item);
			return acc;
		}, {});
}
