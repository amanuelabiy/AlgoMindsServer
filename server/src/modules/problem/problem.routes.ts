import { Router } from "express";
import { problemController } from "./problem.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";

const problemRoutes = Router();

problemRoutes.get(
  "/",
  authenticateJWT,
  problemController.getProblemsWithCursor
);

problemRoutes.get("/getAll", authenticateJWT, problemController.getAllProblems);

problemRoutes.get(
  "/pagination",
  authenticateJWT,
  problemController.getProblemsPagination
);

export default problemRoutes;
