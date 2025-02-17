import { compareValue } from "../../common/utils/bcrypt";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compareValue(plainPassword, hashedPassword);
  }
}
