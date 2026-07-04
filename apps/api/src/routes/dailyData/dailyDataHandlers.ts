import {
  getAllDailyData,
  getDailyData,
  getDailyDataByStation,
} from "@goldstarboard/db-services/dailyData/queries";

import type { GetAllByStationRoute, GetOneRoute, ListRoute } from "./dailyDataRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const dailyData = await getAllDailyData();
  return c.json(dailyData, 200);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const dailyData = await getDailyData(id);

  if (!dailyData) {
    return c.json({ error: "Daily data not found" }, 404);
  }

  return c.json(dailyData, 200);
};

export const getAllByStation: RouteHandler<GetAllByStationRoute> = async (c) => {
  const { stationId } = c.req.valid("param");
  const dailyData = await getDailyDataByStation(stationId);

  if (!dailyData) {
    return c.json({ error: "Daily data not found" }, 404);
  }

  return c.json(dailyData, 200);
};
