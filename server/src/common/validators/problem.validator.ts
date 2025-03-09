import { z } from "zod";

// Zod schema for query validation
export const problemQuerySchema = z.object({
  cursor: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Cursor must be a number",
    })
    .transform((val) => (val ? Number(val) : undefined)),

  limit: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || (!isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100),
      {
        message: "Limit must be a number between 1 and 100",
      }
    )
    .transform((val) => (val ? Number(val) : 14)),
});
