// Interfaces for the weather data being scrape
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

// Interfaces for errors
interface ApiError {
  message: string;
  code: number;
}

// Weather data
interface WeatherData {
  temp: number | null;
  heatIndex: number | null;
  dew: number | null;
  windChill: number | null;
  windSpeed: number | null;
  windGust: number | null;
  windDir: number | null;
  pressure: number | null;
  precipRate: number | null;
  precipAccum: number | null;
  humidity: number | null;
}

// Station
interface Station {
  id: number;
  name: string;
  wuId: string;
}


export type { ApiError, Metric, Observation, Station, WeatherData, WeatherResponse };
