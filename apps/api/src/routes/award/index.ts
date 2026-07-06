import { OpenAPIHono } from "@hono/zod-openapi";
import * as handlers from "./awardHandlers";
import * as routes from "./awardRoutes";

const router = new OpenAPIHono()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.getAllByStation, handlers.getAllByStation);

export default router;
