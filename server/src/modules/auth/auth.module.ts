import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { VerficationRepository } from "../verificationCode/verificationCode.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const userRepository = new UserRepository();
const verificationCodeRepository = new VerficationRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(
  userRepository,
  userService,
  verificationCodeRepository
);
const authController = new AuthController(authService);

export { authService, authController };
