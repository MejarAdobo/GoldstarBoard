import { statSelectSchema as statSchema } from "@goldstarboard/db/schema";
import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { z } from "zod";

const statSelectSchema = z.object(statSchema.shape);

export const list: RouteConfig = createRoute({
  method: "get",
  path: "/stat",
  responses: {
    200: {
      description: "List all stats",
      content: {
        "application/json": {
          schema: statSelectSchema,
        },
      },
    },
  },
});

export const getOne: RouteConfig = createRoute({
  method: "get",
  path: "/stat/{id}",
  request: {
    params: z.object({ id: z.int() }),
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
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
