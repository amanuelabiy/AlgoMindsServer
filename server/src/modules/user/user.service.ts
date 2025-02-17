import { User } from "@prisma/client";
import { RegisterDto } from "../../common/interface/auth.interface";
import { compareValue, hashValue } from "../../common/utils/bcrypt";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(data: RegisterDto): Promise<User> {
    const { firstName, lastName, email, password } = data;

    // Hash Password
    const hashPassword = await this.hashPassword(password, 10);

    return await this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  public async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compareValue(plainPassword, hashedPassword);
  }

  public async hashPassword(
    password: string,
    saltRounds: number
  ): Promise<string> {
    return await hashValue(password, saltRounds);
  }
}
