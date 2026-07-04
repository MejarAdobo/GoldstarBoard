import { getAllStations, getStation } from "@goldstarboard/db-services/station/queries";

import type { GetOneRoute, ListRoute } from "./stationRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const stations = await getAllStations();
  return c.json(stations);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const station = await getStation(id);

  if (!station) {
    return c.json({ error: "Station not found" }, 404);
  }

  return c.json(station);
};
