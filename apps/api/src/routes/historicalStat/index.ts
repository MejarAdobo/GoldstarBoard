import { OpenAPIHono } from "@hono/zod-openapi";
import * as handlers from "./historicalStatHandlers";
import * as routes from "./historicalStatRoutes";

const router = new OpenAPIHono()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.getAllByStation, handlers.getAllByStation);

export default router;
