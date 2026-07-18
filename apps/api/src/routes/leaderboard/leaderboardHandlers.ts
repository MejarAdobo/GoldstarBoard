import { rankByStars, rankByStreak } from "@utils/rankStations";

import type { starRankingRoute, streakRankingRoute } from "./leaderboardRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const streakRanking: RouteHandler<streakRankingRoute> = async (c) => {
  const stations = await rankByStreak();

  const result = stations.map((s) => ({
    ranking: s.rank,
    name: s.name,
    wuId: s.wuId,
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
    name: s.name,
    wuId: s.wuId,
    stars: s.stats?.star,
    hotStreak: s.stats?.hotStreak,
    coldStreak: s.stats?.coldStreak,
    lastDaySinceStar: s.stats?.lastDaySinceStar ?? "",
  }));

  return c.json(result);
};
