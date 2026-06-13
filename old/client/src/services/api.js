import axios from "axios";

const URL = "https://gsb-old.onrender.com/api";

const api = axios.create({
	baseURL: URL,
	timeout: 10000,
});

export const fetchStations = async () => {
	const response = await api.get("/station/");
	return response.data;
};

export const fetchStation = async (wuId) => {
	const response = await api.get(`/station/${wuId}/`);
	return response.data;
};

export const fetchDailyData = async () => {
	const response = await api.get("/dailydata/");
	return response.data;
};

export const fetchHotStreakAwards = async () => {
	const response = await api.get("/hotstreakaward/");
	return response.data;
};

export const fetchColdStreakAwards = async () => {
	const response = await api.get("/coldstreakaward/");
	return response.data;
};

export const fetchMostGoldStarAwards = async () => {
	const response = await api.get("/mostgoldstaraward/");
	return response.data;
};

export const fetchLeastGoldStarAwards = async () => {
	const response = await api.get("/leastgoldstaraward/");
	return response.data;
};

export default api;
