import { getAllAwards, getAllAwardsByStation, getAward } from "@goldstarboard/db-services/award/queries";

import type { GetAllByStationRoute, GetOneRoute, ListRoute } from "./awardRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const list: RouteHandler<ListRoute> = async (c) => {
  const awards = await getAllAwards();
  return c.json(awards);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const award = await getAward(id);

  if (!award) {
    return c.json({ error: "Award not found" }, 404);
  }

  return c.json(award);
};

export const getAllByStation: RouteHandler<GetAllByStationRoute> = async (c) => {
  const { stationId } = c.req.valid("param");
  const awards = await getAllAwardsByStation(stationId);

  if (!awards) {
    return c.json({ error: "No awards found for this station" }, 404);
  }

  return c.json(awards);
};
