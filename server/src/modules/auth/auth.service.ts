import { ErrorCode } from "../../common/enums/error-code.enum";
import { RegisterDto } from "../../common/interface/auth.interface";
import { BadRequestException } from "../../common/utils/catch-errors";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { VerficationRepository } from "../verificationCode/verificationCode.repository";

export class AuthService {
  private userRepository: UserRepository;
  private userService: UserService;
  private verificationCodeRepository: VerficationRepository;

  constructor(
    userRepository: UserRepository,
    userService: UserService,
    verificationCodeRepository: VerficationRepository
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
    this.verificationCodeRepository = verificationCodeRepository;
  }

  public async register(registerData: RegisterDto): Promise<void> {
    const { firstName, lastName, email, password } = registerData;
    // Check if the user already exists
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
    });

    const userId = newUser.id;

    // Create a verification token

    const verificationCode =
      await this.verificationCodeRepository.createVerificationCode({
        userId,
        type: "EMAIL_VERIFICATION",
      });

    //TODO: Create expires at date for verification Code 45 minutes from now
  }
}
