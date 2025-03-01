import { sessionService } from "../session/session.module";
import { userService } from "../user/user.module";
import { verificationCodeService } from "../verificationCode/verificationCode.module";
import { waitListService } from "../waitlist/waitlist.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authService = new AuthService(
  userService,
  verificationCodeService,
  sessionService,
  waitListService
);
const authController = new AuthController(authService);

export { authService, authController };
