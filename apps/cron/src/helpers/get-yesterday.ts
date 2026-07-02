import { getDailyDataByStation } from "@goldstarboard/db-services/daily-data/queries";

export const getYesterdayData = async (id: string) => {
  const allData = await getDailyDataByStation(id);

  if (!allData || allData.length === 0) {
    return undefined;
  }

  return allData[allData.length - 1];
};
