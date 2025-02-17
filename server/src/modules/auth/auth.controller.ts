import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import { registerSchema } from "../../common/validators/auth.validator";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      // Add the user agent to the request body
      const userAgent = req.headers["user-agent"];
      // Validate the request body
      const body = registerSchema.parse({
        ...req.body,
        userAgent,
      });

      this.authService.register(body);

      return res.status(HTTPSTATUS.CREATED).json({
        message: "User registered successfully",
      });
    }
  );
}
