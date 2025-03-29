import { OpenAI } from "openai";
import { config } from "./app.config";

const openAi = new OpenAI({
  apiKey: config.OPEN_API_KEY,
});

export default openAi;
