import { historicalStatSelectSchema as historicalStatSchema } from "@goldstarboard/db/schema";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const historicalStatSelectSchema = z.object(historicalStatSchema.shape);

export const list = createRoute({
  method: "get",
  path: "/historical-stat",
  request: {
    query: historicalStatSelectSchema,
  },
  responses: {
    200: {
      description: "List all historical stats",
      content: {
        "application/json": {
          schema: historicalStatSelectSchema,
        },
      },
    },
  },
});

export const getOne = createRoute({
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
    },
  },
});

export const getAllByStation = createRoute({
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
          schema: historicalStatSelectSchema,
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
