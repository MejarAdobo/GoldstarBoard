import { OpenAPIHono } from "@hono/zod-openapi";
import * as handlers from "./leaderboardHandlers";
import * as routes from "./leaderboardRoutes";

const router = new OpenAPIHono()
  .openapi(routes.streakRanking, handlers.streakRanking)
  .openapi(routes.starRanking, handlers.starRanking)

export default router;
