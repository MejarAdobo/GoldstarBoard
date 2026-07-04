import { awardSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { z } from "zod";

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/awards",
  responses: {
    200: {
      description: "List all awards",
      content: {
        "application/json": {
          schema: z.array(awardSelectSchema),
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
  path: "/awards/{id}",
  request: {
    params: z.object({
      id: z.int(),
    }),
  },
  responses: {
    200: {
      description: "Get one award",
      content: {
        "application/json": {
          schema: awardSelectSchema,
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

export const getAllByStation: RouteConfig = createRoute({
  method: "get",
  path: "/awards/station/{stationId}",
  request: {
    params: z.object({
      stationId: z.string(),
    }),
  },
  responses: {
    200: {
      description: "List of awards by stationId",
      content: {
        "application/json": {
          schema: z.array(awardSelectSchema),
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
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
