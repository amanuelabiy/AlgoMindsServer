import { UserWithPreferences } from "../../@types/user/user";
import { RegisterDto } from "../../common/interface/authDto";
import {
  FindByIdAndUpdateDto,
  UpdateUserPreferencesDto,
} from "../../common/interface/userDto";
import prismaClient from "../../config/prismaClient";
import { User } from "@prisma/client";

export class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findByIdAndUpdate(data: FindByIdAndUpdateDto): Promise<User> {
    return prismaClient.user.update({
      where: { id: data.id },
      data: data.data,
    });
  }

  public async findById(id: string): Promise<User | null> {
    return prismaClient.user.findUnique({
      where: { id },
    });
  }

  public async create(data: RegisterDto): Promise<User> {
    return prismaClient.user.create({
      data: {
        ...data,
        userPreferences: {
          create: {},
        },
      },
      include: {
        userPreferences: true, // Ensuring we load the preferences
      },
    });
  }

  public async getUserWithPreferencesById(
    userId: string
  ): Promise<UserWithPreferences | null> {
    return prismaClient.user.findUnique({
      where: { id: userId },
      include: { userPreferences: true }, // Ensuring we load the preferences
    });
  }

  public async updateUserPreferencesByUserId({
    userId,
    data,
  }: UpdateUserPreferencesDto) {
    return prismaClient.userPreferences.update({
      where: { userId },
      data: data,
    });
  }
}
