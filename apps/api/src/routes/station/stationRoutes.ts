import { stationSelectSchema as stationSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { z } from "zod";

const stationSelectSchema = z.object(stationSchema.shape);

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/station",
  responses: {
    200: {
      description: "List all stations",
      content: {
        "application/json": {
          schema: stationSelectSchema,
        },
      },
    },
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/station/{id}",
  request: {
    params: z.object({ id: z.int() }),
  },
  responses: {
    200: {
      description: "Get one station",
      content: {
        "application/json": {
          schema: stationSelectSchema,
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
