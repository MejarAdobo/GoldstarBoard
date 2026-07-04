import { stationSelectSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { errorResponse } from "@utils/errorResponse";
import { z } from "zod";

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/station",
  responses: {
    200: {
      description: "List all stations",
      content: {
        "application/json": {
          schema: z.array(stationSelectSchema),
        },
      },
    },
    404: errorResponse("List of stations not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/station/{id}",
  request: {
    params: z.object({ id: z.coerce.number().int({ message: "ID must be a whole number" }) }),
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
    404: errorResponse("Station not found"),
    400: errorResponse("Invalid request"),
    500: errorResponse("Internal server error"),
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
