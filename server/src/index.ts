import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import authRoutes from "./modules/auth/auth.routes";

import passport from "./middlewares/passport";
import { authenticateJWT } from "./common/strategies/jwt.strategy";
import sessionRoutes from "./modules/session/session.routes";
import mfaRoutes from "./modules/mfa/mfa.routes";
import waitListRoutes from "./modules/waitlist/waitlist.routes";
import problemRoutes from "./modules/problem/problem.routes";
import submissionRoutes from "./modules/submission/submission.routes";
import openAIRoutes from "./modules/openai/openai.routes";
import judge0Routes from "./modules/judge0/judge0.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
); // Middleware to enable CORS

app.use(cookieParser());
// Initialize passport middleware for authentication and authorization
app.use(passport.initialize());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({ message: "Hello, world!" });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/mfa`, mfaRoutes);
app.use(`${BASE_PATH}/waitlist`, waitListRoutes);
app.use(`${BASE_PATH}/problems`, problemRoutes);
app.use(`${BASE_PATH}/submission`, submissionRoutes);

app.use(`${BASE_PATH}/testai`, openAIRoutes);
// Judge0 API test route
app.use(`${BASE_PATH}/judge0`, judge0Routes);

// Authenticate JWT token for all routes under /session
app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
