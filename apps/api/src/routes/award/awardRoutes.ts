import { awardSelectSchema as awardSchema } from "@goldstarboard/db/schema";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const awardSelectSchema = z.object(awardSchema.shape);

export const list = createRoute({
  method: "get",
  path: "/awards",
  responses: {
    200: {
      description: "List all awards",
      content: {
        "application/json": {
          schema: awardSelectSchema,
        },
      },
    },
  },
});

export const getOne = createRoute({
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
  },
});

export const getAllByStation = createRoute({
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
          schema: awardSelectSchema,
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type GetAllByStationRoute = typeof getAllByStation;
