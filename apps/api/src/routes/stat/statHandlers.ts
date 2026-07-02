import { getAllStats, getStats } from "@goldstarboard/db-services/stat/queries";

import type { GetOneRoute, ListRoute } from "./statRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const stats = await getAllStats();
  return c.json(stats);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const stat = await getStats(id);

  if (!stat) {
    return c.json({ error: "Stat not found" }, 404);
  }

  return c.json(stat);
};
