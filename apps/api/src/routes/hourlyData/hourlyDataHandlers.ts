import { getAllHourlyData, getHourlyData } from "@goldstarboard/db-services/hourlyData/queries";

import type { GetOneRoute, ListRoute } from "./hourlyDataRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const hourlyData = await getAllHourlyData();
  return c.json(hourlyData);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const hourlyData = await getHourlyData(id);

  if (!hourlyData) {
    return c.json({ error: "Hourly data not found" }, 404);
  }

  return c.json(hourlyData);
};
