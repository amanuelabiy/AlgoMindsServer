import { ErrorCode } from "../../common/enums/error-code.enum";
import { InternalServerException } from "../../common/utils/catch-errors";
import { config } from "../../config/app.config";
import openAi from "../../config/openai.config";

export class OpenAIService {
  constructor() {}

  public async getResponseForLandingPage(message: string): Promise<string> {
    const completion = await openAi.chat.completions.create({
      model: config.OPEN_API_MODEL,
      messages: [
        {
          role: "system",
          content: config.OPEN_API_LANDING_PAGE_CHAT_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    if (
      !completion.choices ||
      !completion.choices[0].message ||
      !completion.choices[0].message.content
    ) {
      throw new InternalServerException(ErrorCode.OPENAI_SERVER_ERROR);
    }

    return completion.choices[0].message.content;
  }
}
