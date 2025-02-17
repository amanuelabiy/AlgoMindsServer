import { sessionService } from "../session/service.module";
import { userService } from "../user/user.module";
import { verificationCodeService } from "../verificationCode/verificationCode.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authService = new AuthService(
  userService,
  verificationCodeService,
  sessionService
);
const authController = new AuthController(authService);

export { authService, authController };
