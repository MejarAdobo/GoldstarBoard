import { getAllHourlyData, getHourlyData, getStationHourlyData as gshr } from "@goldstarboard/db-services/hourlyData/queries";

import type { RouteHandler } from "@hono/zod-openapi";
import type { GetOneRoute, GetStationHourlyDataRoute, ListRoute } from "./hourlyDataRoutes";

export const list: RouteHandler<ListRoute> = async (c) => {
  const hourlyData = await getAllHourlyData();
  return c.json(hourlyData, 200);
};

export const getStationHourlyData: RouteHandler<GetStationHourlyDataRoute> = async (c) => {
  const { stationId } = c.req.valid("param");
  const hourlyData = await gshr(stationId);

  if (!hourlyData) {
    return c.json({ error: "Hourly data not found" }, 404);
  }

  return c.json(hourlyData, 200);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const hourlyData = await getHourlyData(id);

  if (!hourlyData) {
    return c.json({ error: "Hourly data not found" }, 404);
  }

  return c.json(hourlyData, 200);
};
