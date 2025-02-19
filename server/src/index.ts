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
import problemRoutes from "./modules/problem/problem.routes";

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

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({ message: "Hello, world!" });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/problems`, problemRoutes);


app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
