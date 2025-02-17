import { RegisterDto } from "../../common/interface/auth.interface";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";

export class AuthService {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor(userRepository: UserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  public async register(registerData: RegisterDto): Promise<void> {
    const { name, email, password, userAgent } = registerData;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Check if the user already exists
  }
}
