import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository, userService);
const authController = new AuthController(authService);

export { authService, authController };
