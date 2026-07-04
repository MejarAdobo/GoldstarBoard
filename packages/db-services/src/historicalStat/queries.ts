import { db } from "@goldstarboard/db/client";

// Get one historicalStats
export const getHistoricalStats = async (id: number) => db.query.historicalStats.findFirst({ where: { id } });

// Get historicalStats by stationId
export const getHistoricalStatsByStation = async (stationId: string) =>
  db.query.historicalStats.findFirst({ where: { stationId } });

// Get all historicalStats
export const getAllHistoricalStats = async () => db.query.historicalStats.findMany();
