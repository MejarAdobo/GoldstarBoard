import { historicalStatSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { errorResponse } from "@utils/errorResponse";
import { z } from "zod";

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/historical-stat",
  responses: {
    200: {
      description: "List all historical stats",
      content: {
        "application/json": {
          schema: historicalStatSelectSchema,
        },
      },
    },
    404: errorResponse("List of historical stats not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/historical-stat/{id}",
  request: {
    params: z.object({ id: z.coerce.number().int({ message: "ID must be a whole number" }) }),
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
    404: errorResponse("Historical stat not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
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
    },
    404: errorResponse("Historical stats not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
