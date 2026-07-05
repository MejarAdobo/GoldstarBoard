import { db } from "@goldstarboard/db/client";

// Get one station
export const getStation = async (id: number) => db.query.stations.findFirst({ where: { id } });

// Get all stations
export const getAllStations = async () => db.query.stations.findMany();

// Get all stations and needed data for my leaderboard stuff
export const getAllStationsForLeaderboard = async () => db.query.stations.findMany({ with: { stats: true } });
