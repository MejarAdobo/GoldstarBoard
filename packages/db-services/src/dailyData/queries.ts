import { db } from "@goldstarboard/db/client";

// Get one dailyData
export const getDailyData = async (id: number) =>
  db.query.dailyData.findFirst({
    where: {
      id,
    },
  });

// Get all the dailyData of a specific station
export const getDailyDataByStation = async (stationId: string) =>
  db.query.dailyData.findMany({
    where: {
      stationId,
    },
    orderBy: (fields, order) => [order.desc(fields.createdAt)],
  });

// Get all dailyData
export const getAllDailyData = async () => db.query.dailyData.findMany();
