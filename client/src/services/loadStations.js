import { fetchStations } from "./api";

export async function loadStations() {
	const stations = await fetchStations();

	const getMomentum = (s) => s.streak.current_hot_streak - s.streak.current_cold_streak;

	const sortedStations = stations
		.sort((a, b) => {
			const diff = getMomentum(b) - getMomentum(a);
			if (diff !== 0) return diff;
			return a.name.localeCompare(b.name);
		})
		.map((station, i, arr) => {
			const momentum = getMomentum(station);
			if (momentum <= 0) {
				station.rank = 5;
			} else {
				station.rank = i === 0 || momentum !== getMomentum(arr[i - 1]) ? i + 1 : arr[i - 1].rank;
			}
			return station;
		});

	return sortedStations.map((station) => ({
		rank: station.rank,
		name: station.name,
		hotStreak: station.streak.current_hot_streak,
		coldStreak: station.streak.current_cold_streak,
		goldStars: station.total_yearly_gold_star,
		goldStarStatus: station.latest_daily?.gold_star_status ?? null,
		weatherData: station.hourly_data.weather_data,
	}));
}
