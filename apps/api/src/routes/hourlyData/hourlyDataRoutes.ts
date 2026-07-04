import { hourlyDataSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { errorResponse } from "@utils/errorResponse";
import { z } from "zod";


export const list: RouteConfig = createRoute({
  method: "get",
  path: "/hourly-data",
  responses: {
    200: {
      description: "List all hourly data",
      content: {
        "application/json": {
          schema: z.array(hourlyDataSelectSchema),
        },
      },
    },
    404: errorResponse("List of hourly data not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const getStationHourlyData: RouteConfig = createRoute({
  method: "get",
  path: "/hourly-data/station/{stationId}",
  request: {
    params: z.object({ stationId: z.string() }),
  },
  responses: {
    200: {
      description: "Get a station's hourly data",
      content: {
        "application/json": {
          schema: hourlyDataSelectSchema,
        },
      },
    },
    404: errorResponse("Station hourly data not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/hourly-data/{id}",
  request: {
    params: z.object({ id: z.coerce.number().int({ message: "ID must be a whole number" }) }),
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
    404: errorResponse("Hourly data not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export type ListRoute = typeof list;
export type GetStationHourlyDataRoute = typeof getStationHourlyData;
export type GetOneRoute = typeof getOne;
