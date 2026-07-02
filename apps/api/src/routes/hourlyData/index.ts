import { OpenAPIHono } from "@hono/zod-openapi";
import * as handlers from "./hourlyDataHandlers";
import * as routes from "./hourlyDataRoutes";

const router = new OpenAPIHono().openapi(routes.list, handlers.list).openapi(routes.getOne, handlers.getOne);

export default router;
