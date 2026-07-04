import { statSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { z } from "zod";

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/stat",
  responses: {
    200: {
      description: "List all stats",
      content: {
        "application/json": {
          schema: z.array(statSelectSchema),
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const getStationStat: RouteConfig = createRoute({
  method: "get",
  path: "/stat/station/{stationId}",
  request: {
    params: z.object({ stationId: z.int() }),
  },
  responses: {
    200: {
      description: "Get station stats",
      content: {
        "application/json": {
          schema: z.array(statSelectSchema),
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/stat/{id}",
  request: {
    params: z.object({ id: z.coerce.number().int({ message: "ID must be a whole number" }) }),
  },
  responses: {
    200: {
      description: "Get one stat",
      content: {
        "application/json": {
          schema: statSelectSchema,
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetStationStatRoute = typeof getStationStat;
export type GetOneRoute = typeof getOne;
