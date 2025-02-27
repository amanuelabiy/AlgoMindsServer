import { User } from "@prisma/client";
import { RegisterDto } from "../../common/interface/authDto";
import { compareValue, hashValue } from "../../common/utils/bcrypt";
import { UserRepository } from "./user.repository";
import {
  FindByIdAndUpdateDto,
  UpdateUserPreferencesDto,
} from "../../common/interface/userDto";
import { UserWithPreferences } from "../../@types/user/user";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(data: RegisterDto): Promise<User> {
    const { firstName, lastName, email, password, username } = data;

    // Hash Password
    const hashPassword = await this.hashPassword(password, 10);

    return await this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      username,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  public async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }

  public async findByIdAndUpdate(data: FindByIdAndUpdateDto): Promise<User> {
    return await this.userRepository.findByIdAndUpdate(data);
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  public async getUserWithPreferencesById(
    userId: string
  ): Promise<UserWithPreferences | null> {
    return await this.userRepository.getUserWithPreferencesById(userId);
  }

  public async updateUserPreferencesByUserId(data: UpdateUserPreferencesDto) {
    return await this.userRepository.updateUserPreferencesByUserId(data);
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
