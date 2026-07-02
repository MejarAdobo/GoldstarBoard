import { createHourlyData, deleteHourlyData } from "@goldstarboard/db-services/hourlyData/mutations";
import { createStats, deleteStats } from "@goldstarboard/db-services/stat/mutations";
import { createStation, deleteStation } from "@goldstarboard/db-services/station/mutations";
import { getHourlyData } from "@tasks/hourlyData";

// Will remove if admin page is created

const dialouge = () => {
  console.log("-- Adding a New Station --");
  let name: string | null = null;
  let wuId: string | null = null;

  while (!name || name.trim() === "") {
    name = prompt("Enter the station name:");
  }

  while (!wuId || wuId.trim() === "") {
    wuId = prompt("Enter the WU ID:");
  }

  return { name, wuId };
};

const newStation = async () => {
  const { name, wuId } = dialouge();

  try {
    await createStation(name, wuId);

    const hourlyData = await getHourlyData(wuId);
    if (hourlyData) {
      await createHourlyData(wuId, hourlyData.metric, hourlyData.imperial);
    }

    await createStats(wuId, 0, 0, 0, undefined);

    console.log(`[${name}] [WU ID: ${wuId}] added successfully!`);
  } catch (error) {
    await deleteStation(wuId);
    await deleteHourlyData(wuId);
    await deleteStats(wuId);

    console.error(error);
  }
};

newStation().catch(console.error);
