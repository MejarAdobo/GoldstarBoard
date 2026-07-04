import { getAllStats, getStat, getStationStat as gss } from "@goldstarboard/db-services/stat/queries";

import type { GetOneRoute, GetStationStatRoute, ListRoute } from "./statRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const stats = await getAllStats();
  return c.json(stats, 200);
};

export const getStationStat: RouteHandler<GetStationStatRoute> = async (c) => {
  const { stationId } = c.req.valid("param");
  const stat = await gss(stationId);

  if (!stat) {
    return c.json({ error: "Stat not found" }, 404);
  }

  return c.json(stat, 200);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const stat = await getStat(id);

  if (!stat) {
    return c.json({ error: "Stat not found" }, 404);
  }

  return c.json(stat, 200);
};
