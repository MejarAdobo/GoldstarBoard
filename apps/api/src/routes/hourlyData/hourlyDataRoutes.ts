import { hourlyDataSelectSchema as hourlyDataSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { z } from "zod";

const hourlyDataSelectSchema = z.object(hourlyDataSchema.shape);

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/hourly-data",
  responses: {
    200: {
      description: "List all hourly data",
      content: {
        "application/json": {
          schema: hourlyDataSelectSchema,
        },
      },
    },
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/hourly-data/{id}",
  request: {
    params: z.object({ id: z.int() }),
  },
  responses: {
    200: {
      description: "Get one hourly data",
      content: {
        "application/json": {
          schema: hourlyDataSelectSchema,
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
