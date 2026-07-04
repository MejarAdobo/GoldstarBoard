import { db } from "@goldstarboard/db/client";

// Get one station
export const getStation = async (id: number) => db.query.stations.findFirst({ where: { id } });

// Get all stations
export const getAllStations = async () => db.query.stations.findMany();
