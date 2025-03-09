import { getEnv } from "../common/utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "localhost"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  DATABASE_URL: getEnv("DIRECT_URL"),
  APPLICATION_NAME: getEnv("APPLICATION_NAME"),

  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  },
  MAILER_SENDER: getEnv("MAILER_SENDER"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  EMAIL_SENDER: getEnv("EMAIL_SENDER"),
  MAILER_RECEIVER: getEnv("MAILER_RECEIVER"),
  JUDGE0_API_BASE_URL: getEnv("JUDGE0_API_BASE_URL"),

  JUDGE0_HEADERS :getEnv("JUDGE0_HEADERS") ? JSON.parse(getEnv("JUDGE0_HEADERS")): "",
  OPEN_API_KEY: getEnv("OPEN_API_KEY"),
  OPENAI_TESTCASE_PROMPT: getEnv("OPENAI_TESTCASE_PROMPT"),
  

});

export const JWT_EXPIRES_IN = "15m";
export const JWT_REFRESH_EXPIRES_IN = "30d";

export const config = appConfig();
