import { z } from "zod";

export const submissionSchema = z.object({
  sourceCode: z
    .string()
    .min(1, "Source code is required")
    .max(100000, "Source code is too long"),
  languageId: z
    .number()
    .int()
    .positive("Language ID must be a positive integer")
    .min(1, "Invalid language ID"),
  problemId: z
    .number()
    .int()
    .positive("Problem ID must be a positive integer")
    .min(1, "Invalid problem ID"),
  // socketId: z.string().min(1, "Socket ID is required"),
});
