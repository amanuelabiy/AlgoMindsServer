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
import openAIRoutes from "./modules/openai/openai.routes";
import problemRoutes from "./modules/problem/problem.routes";
import { createServer } from "http";
import keysRoutes from "./modules/keys/keys.routes";
import submissionRoutes from "./modules/submission/submission.routes";
import { initializeSocket } from "./modules/sockets";
import judge0Routes from "./modules/judge0/judge0.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

const server = createServer(app);

// Middlewares
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

// Routes
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({ message: "Hello, world!" });
  })
);
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/mfa`, mfaRoutes);
app.use(`${BASE_PATH}/waitlist`, authenticateJWT, waitListRoutes);
app.use(`${BASE_PATH}/problems`, authenticateJWT, problemRoutes);
app.use(`${BASE_PATH}/keys`, authenticateJWT, keysRoutes);
app.use(`${BASE_PATH}/submissions`, authenticateJWT, submissionRoutes);
app.use(`${BASE_PATH}/openai`, openAIRoutes);
app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);

// Route For Judge0 API Callback
app.use(`${BASE_PATH}/judge0`, judge0Routes);

// Error handling middleware
app.use(errorHandler);

// Socket IO
const socketService = initializeSocket(server);

server.listen(config.PORT, async () => {
  console.log(
    `Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
