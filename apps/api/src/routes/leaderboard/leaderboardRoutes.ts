import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { errorResponse } from "@utils/errorResponse";
import { z } from "zod";

const rankingSchema = z.object({
  ranking: z.number(),
  stationName: z.string(),
  stars: z.number(),
  hotStreak: z.number(),
  coldStreak: z.number(),
  lastDaySinceStart: z.string(),
});

export const streakRanking: RouteConfig = createRoute({
  method: "GET",
  path: "/streak-ranking",
  response: {
    200: {
      description: "Leaderboard based on Streak",
      content: {
        "application/json": {
          schema: z.array(rankingSchema),
        },
      },
    },
    404: errorResponse("Leaderboard not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const starRanking: RouteConfig = createRoute({
  method: "GET",
  path: "/star-ranking",
  response: {
    200: {
      description: "Leaderboard based on Star amount",
      content: {
        "application/json": {
          schema: z.array(rankingSchema),
        },
      },
    },
    404: errorResponse("Leaderboard not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export type streakRankingRoute = typeof streakRanking;
export type starRankingRoute = typeof starRanking;
