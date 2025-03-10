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
});
