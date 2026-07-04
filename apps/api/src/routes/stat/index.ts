import { OpenAPIHono } from "@hono/zod-openapi";
import * as handlers from "./statHandlers";
import * as routes from "./statRoutes";

const router = new OpenAPIHono().openapi(routes.list, handlers.list).openapi(routes.getOne, handlers.getOne).openapi(routes.getStationStat, handlers.getStationStat);

export default router;
