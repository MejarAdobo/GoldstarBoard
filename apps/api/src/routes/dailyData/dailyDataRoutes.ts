import { dailyDataSelectSchema as dailyDataSchema } from "@goldstarboard/db/schema";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const dailyDataSelectSchema = z.object(dailyDataSchema.shape);

export const list = createRoute({
  method: "get",
  path: "/dailyData",
  request: {
    query: dailyDataSelectSchema,
  },
  responses: {
    200: {
      description: "List all daily data",
      content: {
        "application/json": {
          schema: z.array(dailyDataSelectSchema),
        },
      },
    },
  },
});

export const getOne = createRoute({
  method: "get",
  path: "/dailyData/{id}",
  request: {
    params: z.object({ id: z.int() }),
  },
  responses: {
    200: {
      description: "Get one daily data",
      content: {
        "application/json": {
          schema: dailyDataSelectSchema,
        },
      },
    },
  },
});

export const getAllByStation = createRoute({
  method: "get",
  path: "/dailyData/stat/{stationId}",
  request: {
    params: z.object({ stationId: z.string() }),
  },
  responses: {
    200: {
      description: "Get all daily data by stationId",
      content: {
        "application/json": {
          schema: z.array(dailyDataSelectSchema),
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
