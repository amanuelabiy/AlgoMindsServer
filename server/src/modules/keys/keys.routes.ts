import { Router } from "express";
import { keysController } from "./keys.module";

const keysRoutes = Router();

keysRoutes.post("/beta/join", keysController.joinBeta);

export default keysRoutes;
