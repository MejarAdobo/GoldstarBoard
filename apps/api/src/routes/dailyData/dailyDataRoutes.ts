import { dailyDataSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { errorResponse } from "@utils/errorResponse";
import { z } from "zod";

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/dailyData",
  responses: {
    200: {
      description: "List all daily data",
      content: {
        "application/json": {
          schema: z.array(dailyDataSelectSchema),
        },
      },
    },
    404: errorResponse("List of daily data not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/dailyData/{id}",
  request: {
    params: z.object({ id: z.coerce.number().int({ message: "ID must be a whole number" }) }),
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
    404: errorResponse("Daily data not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const getAllByStation: RouteConfig = createRoute({
  method: "get",
  path: "/dailyData/station/{stationId}",
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
    404: errorResponse("Station daily data not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
