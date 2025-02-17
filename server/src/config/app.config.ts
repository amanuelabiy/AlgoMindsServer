import { getEnv } from "../common/utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "localhost"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  DATABASE_URL: getEnv("DIRECT_URL"),

  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  },
});

export const JWT_EXPIRES_IN = "15m";
export const JWT_REFRESH_EXPIRES_IN = "30d";

export const config = appConfig();
