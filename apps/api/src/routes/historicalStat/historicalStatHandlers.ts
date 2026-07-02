import {
  getAllHistoricalStats,
  getHistoricalStats,
  getHistoricalStatsByStation,
} from "@goldstarboard/db-services/historicalStat/queries";

import type { GetAllByStationRoute, GetOneRoute, ListRoute } from "./historicalStatRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const historicalStats = await getAllHistoricalStats();
  return c.json(historicalStats);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const historicalStats = await getHistoricalStats(id);

  if (!historicalStats) {
    return c.json({ error: "Historical stats not found" }, 404);
  }

  return c.json(historicalStats);
};

export const getAllByStation: RouteHandler<GetAllByStationRoute> = async (c) => {
  const { stationId } = c.req.valid("param");
  const historicalStats = await getHistoricalStatsByStation(stationId);

  if (!historicalStats) {
    return c.json({ error: "No historical stats found for this station" }, 404);
  }

  return c.json(historicalStats);
};
