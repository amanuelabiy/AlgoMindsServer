import { z } from "zod";

export const landingPageChatSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
});
