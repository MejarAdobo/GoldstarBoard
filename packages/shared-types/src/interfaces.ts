import type { starStatusEnum } from "./enums";

// Interfaces for the weather data being scrape
interface WeatherMeasurements {
  temp: number | null;
  heatIndex: number | null;
  dewpt: number | null;
  windChill: number | null;
  windSpeed: number | null;
  windGust: number | null;
  pressure: number | null;
  precipRate: number | null;
  precipTotal: number | null;
  elev: number | null;
}

interface Observation {
  stationID: string;
  obsTimeUtc: string;
  obsTimeLocal: string;
  neighborhood: string;
  softwareType: string;
  country: string;
  solarRadiation: number | null;
  lon: number | null;
  realtimeFrequency: null;
  epoch: number;
  lat: number | null;
  uv: number | null;
  winddir: number | null;
  humidity: number | null;
  qcStatus: number;
  metric?: WeatherMeasurements;
  imperial?: WeatherMeasurements;
}

// Interfaces for errors
interface ApiError {
  message: string;
  code: number;
}

// Weather data
interface WeatherData {
  temp: number | null;
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

// Hourly Data
interface HourlyData {
  station: string;
  metric: WeatherData;
  imperial: WeatherData;
}

// Daily Data
interface DailyData {
  stationId: string;
  starStatus: starStatusEnum;
}

// Stats
interface Stats {
  stationId: string;
  star: number;
  hotStreak: number;
  coldStreak: number;
  lastDaySinceStar: string | null;
}

export type {
  ApiError,
  DailyData,
  HourlyData,
  Observation,
  Station,
  Stats,
  WeatherData,
  WeatherMeasurements,
};
