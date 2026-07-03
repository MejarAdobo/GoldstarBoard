import { db } from "@goldstarboard/db/client";

// Get one hourly data
export const getHourlyData = async (id: number) =>
  db.query.hourlyData.findFirst({ where: { id } });

// Get a station's hourly data
export const getStationHourlyData = async (stationId: string) =>
  db.query.hourlyData.findMany({ where: { stationId } });

// Get all hourly data
export const getAllHourlyData = async () => db.query.hourlyData.findMany();
