import axios from "axios";

const URL = "http://10.0.0.130:8000/api";

const api = axios.create({
	baseURL: URL,
	timeout: 10000,
});

export interface Station {
	id: number;
	name: string;
	wu_id: string;
	wu_link: string;
	total_gold_star: number;
	total_yearly_gold_star: number;
	last_day_since_gold_star: string | null;
}

export interface Streak {
	id: number;
	station: number;
	longest_gold_star_streak: number;
	longest_yearly_gold_star_streak: number;
	current_gold_star_streak: number;
	longest_cold_streak: number;
	longest_yearly_cold_streak: number;
	current_cold_streak: number;
}

export interface HourlyData {
	id: number;
	station: number;
	recorded_at: string;
	has_gold_star: boolean;
}

export const fetchStations = async (): Promise<Station[]> => {
	const response = await api.get<Station[]>("/station/");
	return response.data;
};

export const fetchStation = async (wuId: string): Promise<Station> => {
	const response = await api.get<Station>(`/station/${wuId}/`);
	return response.data;
};

export const fetchHourlyData = async (): Promise<HourlyData[]> => {
	const response = await api.get<HourlyData[]>("/hourlydata/");
	return response.data;
};

export const fetchStreaks = async (): Promise<Streak[]> => {
	const response = await api.get<Streak[]>("/streak/");
	return response.data;
};

export default api;
