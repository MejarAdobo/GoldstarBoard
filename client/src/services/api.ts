import axios from "axios";

const URL = "https://weather.itas.ca/api";

const api = axios.create({
	baseURL: URL,
	timeout: 10000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WeatherData = Record<string, any>;

export interface Streak {
	id: number;
	station: number;
	longest_hot_streak: number;
	longest_yearly_hot_streak: number;
	current_hot_streak: number;
	longest_cold_streak: number;
	longest_yearly_cold_streak: number;
	current_cold_streak: number;
	created_at: string;
	updated_at: string;
}

export interface HourlyData {
	id: number;
	station: number;
	recorded_at: string;
	weather_data: WeatherData;
	has_gold_star: boolean;
}

export interface Station {
	id: number;
	rank?: number;
	name: string;
	wu_id: string;
	total_gold_star: number;
	total_yearly_gold_star: number;
	last_day_since_gold_star: string | null;
	streak: Streak;
	hourly_data: HourlyData;
	latest_daily: DailyData | null;
	created_at: string;
	updated_at: string;
}

export interface DailyData {
	id: number;
	station: number;
	recorded_at: string;
	has_gold_star: boolean;
	gold_star_status: string | null;
}

export interface HotStreakAward {
	id: number;
	year: number;
	recipient: number;
	place: number;
	streak_length: number;
}

export interface ColdStreakAward {
	id: number;
	year: number;
	recipient: number;
	place: number;
	streak_length: number;
}

export interface MostGoldStarAward {
	id: number;
	year: number;
	recipient: number;
	place: number;
	total_gold_stars: number;
}

export interface LeastGoldStarAward {
	id: number;
	year: number;
	recipient: number;
	place: number;
	total_gold_stars: number;
}

export const fetchStations = async (): Promise<Station[]> => {
	const response = await api.get<Station[]>("/station/");
	return response.data;
};

export const fetchStation = async (wuId: string): Promise<Station> => {
	const response = await api.get<Station>(`/station/${wuId}/`);
	return response.data;
};

export const fetchDailyData = async (): Promise<DailyData[]> => {
	const response = await api.get<DailyData[]>("/dailydata/");
	return response.data;
};

export const fetchHotStreakAwards = async (): Promise<HotStreakAward[]> => {
	const response = await api.get<HotStreakAward[]>("/hotstreakaward/");
	return response.data;
};

export const fetchColdStreakAwards = async (): Promise<ColdStreakAward[]> => {
	const response = await api.get<ColdStreakAward[]>("/coldstreakaward/");
	return response.data;
};

export const fetchMostGoldStarAwards = async (): Promise<
	MostGoldStarAward[]
> => {
	const response = await api.get<MostGoldStarAward[]>("/mostgoldstaraward/");
	return response.data;
};

export const fetchLeastGoldStarAwards = async (): Promise<
	LeastGoldStarAward[]
> => {
	const response =
		await api.get<LeastGoldStarAward[]>("/leastgoldstaraward/");
	return response.data;
};

export default api;
