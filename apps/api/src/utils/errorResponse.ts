import { z } from "zod";

export const errorResponseSchema = z.object({
    error: z.string(),
});

export const errorResponse = (desc: string) => ({
  desc,
  content: {
    "application/json": {
      schema: errorResponseSchema,
    },
  },
});
