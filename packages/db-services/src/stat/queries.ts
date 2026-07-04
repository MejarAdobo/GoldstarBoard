import { db } from "@goldstarboard/db/client";

// Get one stat
export const getStat = async (id: number) => db.query.stats.findFirst({ where: { id } });

// Get a station's stat
export const getStationStat = async (stationId: string) => db.query.stats.findFirst({ where: { stationId } });

// Get all stats
export const getAllStats = async () => db.query.stats.findMany();
