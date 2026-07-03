import { historicalStatSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { z } from "zod";

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/historical-stat",
  request: {
    query: z.array(historicalStatSelectSchema),
  },
  responses: {
    200: {
      description: "List all historical stats",
      content: {
        "application/json": {
          schema: historicalStatSelectSchema,
        },
      },
    },404: {
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
  path: "/historical-stat/{id}",
  request: {
    params: z.object({ id: z.int() }),
  },
  responses: {
    200: {
      description: "Get one historical stat",
      content: {
        "application/json": {
          schema: historicalStatSelectSchema,
        },
      },
    },404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export const getAllByStation: RouteConfig = createRoute({
  method: "get",
  path: "/historical-stat/station/{stationId}",
  request: {
    params: z.object({ stationId: z.string() }),
  },
  responses: {
    200: {
      description: "Get all historical stats by stationId",
      content: {
        "application/json": {
          schema: z.array(historicalStatSelectSchema),
        },
      },
    },404: {
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
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
