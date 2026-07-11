import { rankByStars, rankByStreak } from "@utils/rankStations";

import type { RouteHandler } from "@hono/zod-openapi";
import type { starRankingRoute, streakRankingRoute } from "./leaderboardRoutes";

export const streakRanking: RouteHandler<streakRankingRoute> = async (c) => {
  const stations = await rankByStreak();

  const result = stations.map((s) => ({
    ranking: s.rank,
    stationName: s.name,
    stars: s.stats?.star,
    hotStreak: s.stats?.hotStreak,
    coldStreak: s.stats?.coldStreak,
    lastDaySinceStar: s.stats?.lastDaySinceStar ?? "",
  }));

  return c.json(result);
};

export const starRanking: RouteHandler<starRankingRoute> = async (c) => {
  const stations = await rankByStars();

  const result = stations.map((s) => ({
    ranking: s.rank,
    stationName: s.name,
    stars: s.stats?.star,
    hotStreak: s.stats?.hotStreak,
    coldStreak: s.stats?.coldStreak,
    lastDaySinceStar: s.stats?.lastDaySinceStar ?? "",
  }));

  return c.json(result);
};
