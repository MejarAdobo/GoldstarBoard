import axios, { isAxiosError } from "axios";

// Todo: add all of this interface in type package
interface ApiError {
  message: string;
  code: number;
}

interface Metric {
  temp: number;
  heatIndex: number;
  dewpt: number;
  windChill: number;
  windSpeed: number;
  windGust: number;
  pressure: number;
  precipRate: number;
  precipTotal: number;
  elev: number;
}

interface Observation {
  stationID: string;
  obsTimeUtc: string;
  obsTimeLocal: string;
  neighborhood: string;
  softwareType: string;
  country: string;
  solarRadiation: number;
  lon: number;
  realtimeFrequency: null;
  epoch: number;
  lat: number;
  uv: number;
  winddir: number;
  humidity: number;
  qcStatus: number;
  metric: Metric;
}

interface WeatherResponse {
  observations: Observation[];
}

export const fetchData = async (url: string) => {
  // Todo: add to config package
  const config = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  try {
    const resp = await axios.get<string | WeatherResponse>(url, config);

    if (!resp.data) {
      throw new Error(`No data returned from [${url}]`);
    }

    return resp.data;
  } catch (error) {
    if (isAxiosError<ApiError>(error)) {
      console.error(error.response?.data.message);
      console.error(error.response?.status);
    }
    throw error;
  }
};
