import { Router } from "express";
import { problemController } from "./problem.module";

const problemRoutes = Router();

problemRoutes.get("/", problemController.getProblems);

export default problemRoutes;
