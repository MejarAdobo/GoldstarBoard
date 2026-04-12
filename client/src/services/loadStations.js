import { fetchStations } from "./api";

function mapStation(station) {
	return {
		id: station.id,
		name: station.name,
		hotStreak: station.streak.current_hot_streak,
		coldStreak: station.streak.current_cold_streak,
		goldStars: station.total_yearly_gold_star,
		goldStarStatus: station.latest_daily?.gold_star_status ?? null,
		weatherData: station.hourly_data.weather_data,
	};
}

export async function loadStations() {
	const stations = await fetchStations();
	return stations.map(mapStation);
}

export function sortStationsByRank(stations) {
	const getMomentum = (s) => s.hotStreak - s.coldStreak;

	return [...stations]
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
}
