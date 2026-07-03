import { db } from "@goldstarboard/db/client";

// Get one award
export const getAward = async (id: number) =>
  db.query.awards.findFirst({
    where: {
      id
    }
  });

// Get all awards of a specific station
export const getAllAwardsByStation = async (stationId: string) =>
  db.query.awards.findMany({
    where: {
      stationId
    }
  });

// Get all awards
export const getAllAwards = async () => db.query.awards.findMany();
