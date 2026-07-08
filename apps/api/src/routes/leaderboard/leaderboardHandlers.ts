import { rankByStars, rankByStreak } from "@utils/rankStations";

import type { starRankingRoute, streakRankingRoute } from "./leaderboardRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const streakRanking: RouteHandler<streakRankingRoute> = async (c) => {
  const stations = await rankByStreak();
  return c.json(stations);
};

export const starRanking: RouteHandler<starRankingRoute> = async (c) => {
  const stations = await rankByStars();
  return c.json(stations);
};
