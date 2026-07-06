import { OpenAPIHono } from "@hono/zod-openapi";
import * as handlers from "./stationHandlers";
import * as routes from "./stationRoutes";

const router = new OpenAPIHono().openapi(routes.list, handlers.list).openapi(routes.getOne, handlers.getOne);

export default router;
